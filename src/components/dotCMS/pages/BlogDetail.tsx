// Internals
import { SinglePageDetail, ContentBlocks } from '@/components'
import { DotCMSDetailPageProps } from './type'
import Editable from '../../Editable';

export function BlogDetail({
  pageRender: { urlContentMap: data },
}: DotCMSDetailPageProps) {
  const { blogContent, contentType, languageId, inode,  } = data

  const onClick = (event) => {
    const customEvent = new CustomEvent('ng-event', {
      detail: { name: 'edit-block-editor', data: event.target }
    });
    window.top.document.dispatchEvent(customEvent); 
  }

  return (
    <SinglePageDetail {...data}>
        <Editable
            contentType={contentType}
            editorContent={JSON.stringify(blogContent)}
            element={<div><ContentBlocks content={blogContent.content} /></div>}
            field="blogContent"
            inode={inode}
            lang={languageId.toString()}
            onClick={onClick}
        />
    </SinglePageDetail>
  )
}

export default BlogDetail
