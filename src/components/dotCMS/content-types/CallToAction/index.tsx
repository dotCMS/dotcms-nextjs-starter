import React from 'react';

// Type
import { CallToActionProps } from './type';

export const CallToAction = ({
    headline,
    subHeading,
    buttonUrl1,
    buttonText1,
    buttonUrl2,
    buttonText2,
    targetLink2,
  }: CallToActionProps) => {

  const btn2Props =
    targetLink2 === 'iframe'
      ? { 'data-lightbox': 'iframe' }
      : { target: '_blank' }

  return (
    <div className="mb-4">
      <h2 className="mb-4 uppercase">{headline}</h2>
      <div dangerouslySetInnerHTML={{ __html: subHeading }} />
      <div className="flex flex-col flex-wrap gap-2 items-start sm:flex-row sm:justify-start sm:items-center">
        {buttonUrl1 && buttonText1 && (
          <a
            className="bg-dot-purple py-1.5 px-3 text-white uppercase font-bold hover:bg-black hover:text-white"
            href={buttonUrl1}
          >
            {buttonText1}
          </a>
        )}
        {buttonUrl2 && buttonText2 && (
          <a
            className="text-dot-purple hover:text-black"
            href={buttonUrl2}
            {...btn2Props}
          >
            {buttonText2}
          </a>
        )}
      </div>
    </div>
  )
}

export default CallToAction

// <!-- Container Code: /application/containers/calltoaction.vtl -->

// <h1>$!{headline}</h1>
// $!{subHeading}
{
  /* <div class="btn-group">
    #if($UtilMethods.isSet($buttonText1) && $UtilMethods.isSet($buttonUrl1))
        <a class="btn btn-primary" href="$buttonUrl1">$buttonText1</a>
    #end

    #if($UtilMethods.isSet($buttonText2) && $UtilMethods.isSet($buttonUrl2))
        #if($targetLink2 == "iframe")
            #set($target = "data-lightbox='iframe'")
        #elseif($targetLink2 == "new")
            #set($target = "target='_blank'")
        #end
        <a class="btn btn-flat" href="$buttonUrl2" $!{target}>$buttonText2</a>
    #end
</div> */
}
