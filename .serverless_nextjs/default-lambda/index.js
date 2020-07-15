"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const prerender_manifest_json_1 = __importDefault(require("./prerender-manifest.json"));
const manifest_json_1 = __importDefault(require("./manifest.json"));
const next_aws_cloudfront_1 = __importDefault(require("@sls-next/next-aws-cloudfront"));
const addS3HostHeader = (req, s3DomainName) => {
    req.headers["host"] = [{ key: "host", value: s3DomainName }];
};
const isDataRequest = (uri) => uri.startsWith("/_next/data");
const normaliseUri = (uri) => (uri === "/" ? "/index" : uri);
const normaliseS3OriginDomain = (s3Origin) => {
    if (s3Origin.region === "us-east-1") {
        return s3Origin.domainName;
    }
    if (!s3Origin.domainName.includes(s3Origin.region)) {
        const regionalEndpoint = s3Origin.domainName.replace("s3.amazonaws.com", `s3.${s3Origin.region}.amazonaws.com`);
        return regionalEndpoint;
    }
    return s3Origin.domainName;
};
const router = (manifest) => {
    const { pages: { ssr, html } } = manifest;
    const allDynamicRoutes = Object.assign(Object.assign({}, ssr.dynamic), html.dynamic);
    return (uri) => {
        let normalisedUri = uri;
        if (isDataRequest(uri)) {
            normalisedUri = uri
                .replace(`/_next/data/${manifest.buildId}`, "")
                .replace(".json", "");
        }
        if (ssr.nonDynamic[normalisedUri]) {
            return ssr.nonDynamic[normalisedUri];
        }
        for (const route in allDynamicRoutes) {
            const { file, regex } = allDynamicRoutes[route];
            const re = new RegExp(regex, "i");
            const pathMatchesRoute = re.test(normalisedUri);
            if (pathMatchesRoute) {
                return file;
            }
        }
        if (html.nonDynamic["/404"] !== undefined) {
            return "pages/404.html";
        }
        return "pages/_error.js";
    };
};
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const request = event.Records[0].cf.request;
    const uri = normaliseUri(request.uri);
    const manifest = manifest_json_1.default;
    const prerenderManifest = prerender_manifest_json_1.default;
    const { pages, publicFiles } = manifest;
    const isStaticPage = pages.html.nonDynamic[uri];
    const isPublicFile = publicFiles[uri];
    const isPrerenderedPage = prerenderManifest.routes[request.uri];
    const origin = request.origin;
    const s3Origin = origin.s3;
    const isHTMLPage = isStaticPage || isPrerenderedPage;
    const normalisedS3DomainName = normaliseS3OriginDomain(s3Origin);
    s3Origin.domainName = normalisedS3DomainName;
    if (isHTMLPage || isPublicFile) {
        s3Origin.path = isHTMLPage ? "/static-pages" : "/public";
        addS3HostHeader(request, normalisedS3DomainName);
        if (isHTMLPage) {
            request.uri = `${uri}.html`;
        }
        return request;
    }
    const pagePath = router(manifest)(uri);
    if (pagePath.endsWith(".html")) {
        s3Origin.path = "/static-pages";
        request.uri = pagePath.replace("pages", "");
        addS3HostHeader(request, normalisedS3DomainName);
        return request;
    }
    const page = require(`./${pagePath}`);
    const { req, res, responsePromise } = next_aws_cloudfront_1.default(event.Records[0].cf);
    if (isDataRequest(uri)) {
        const { renderOpts } = yield page.renderReqToHTML(req, res, "passthrough");
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(renderOpts.pageData));
    }
    else {
        page.render(req, res);
    }
    return responsePromise;
});
