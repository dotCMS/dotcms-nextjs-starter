const GlobalStyles = () => (
    <style global jsx>
        {`
            :root {
                --dark: #343a40;
                --white: #fff;
                --primary: #e76300;
            }
            body {
                font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                    'Helvetica Neue', Arial, sans-serif;
                font-size: 14px;
            }
            @import url('/application/themes/travel/css/styles.dotsass');
            @import url('//fonts.googleapis.com/css?family=Oswald:500,600,700%7CRoboto:300,300i,700%7CCondiment%7CDella+Respira');

            /* Make clicks pass-through */
            #nprogress {
                pointer-events: none;
            }

            #nprogress .bar {
                background: var(--primary);

                position: fixed;
                z-index: 1031;
                top: 0;
                left: 0;

                width: 100%;
                height: 2px;
            }

            /* Fancy blur effect */
            #nprogress .peg {
                display: block;
                position: absolute;
                right: 0px;
                width: 100px;
                height: 100%;
                box-shadow: 0 0 10px var(--primary), 0 0 5px var(--primary);
                opacity: 1;

                -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                transform: rotate(3deg) translate(0px, -4px);
            }

            /* Remove these to get rid of the spinner */
            #nprogress .spinner {
                display: block;
                position: fixed;
                z-index: 1031;
                top: 15px;
                right: 15px;
            }

            #nprogress .spinner-icon {
                width: 18px;
                height: 18px;
                box-sizing: border-box;

                border: solid 2px transparent;
                border-top-color: var(--primary);
                border-left-color: var(--primary);
                border-radius: 50%;

                -webkit-animation: nprogress-spinner 400ms linear infinite;
                animation: nprogress-spinner 400ms linear infinite;
            }

            .nprogress-custom-parent {
                overflow: hidden;
                position: relative;
            }

            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
                position: absolute;
            }

            @-webkit-keyframes nprogress-spinner {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }
            @keyframes nprogress-spinner {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}
    </style>
);

export default GlobalStyles;
