import { BLOCKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";



export function renderPost() {

    // function Content({ body }) {
    //     const Code = ({children}) => <div><pre><code>{children}</code></pre></div>
    //     const options = {
    //       renderNode: {
    //         // コードブロックをdivで括る
    //         [BLOCKS.PARAGRAPH]: (node, children) => {
    //           if (
    //             node.content.length === 1 && find(node.content[0].marks, { type: 'code' })
    //           ) {
    //             return <Code>{children}</Code>;
    //           }
    //           return <p>{children}</p>;
    //         },
    //       }
    //     }
      
    //     return (
    //         <div className="content">
    //           {documentToReactComponents(body)}
    //         </div>
    //     )
    // }

    // const codeEl = document.querySelectorAll("code");
    // console.log( codeEl) 


    // couldn't figure out how to use the contentful renderer (react/jsx) to change the text so did it with plain javascript
    
    if (document.querySelector("code")) {
        document.querySelectorAll('code').forEach(el => {

          let content = el.outerHTML;
          let parent = el.parentElement;

          if (el.parentElement.childNodes.length === 1) {
            // console.log( parent.childNodes )
            return parent.innerHTML = `<pre>${content}</div>`;
          }
        
        });
    }

    // const renderOptions = {
    //     renderMark: {
    //         [MARKS.CODE]: text => {
    //             if (text.length > 0) {
    //               return <code>{text}</code>;
    //             }
    //         }
    //     },
    //     renderNode: {
    //         // [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    //         [BLOCKS.UL_LIST]: (node, children) => (
    //             <ul>{children}</ul>
    //         ),
    //         [BLOCKS.OL_LIST]: (node, children) => (
    //             <ol>{children}</ol>
    //         ),
    //         [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    //         [BLOCKS.PARAGRAPH]: (node, children) => {
    //             if (
    //                 node.content.length === 1 && find(node.content[0].marks, { type: 'code' })
    //             ) {
    //                 return (
    //                     <pre><code>{node.content[0].value}</code></pre>
    //                 );
    //             }

    //         },
    //         [BLOCKS.EMBEDDED_ASSET]: (node, children) => {

    //         const assetType = node.data.target.fields.file.contentType;

    //             switch (assetType) {
    //                 case "video/mp4":
    //                 return (
    //                     <video width="100%" height="100%" controls>
    //                     <source src={node.data.target.fields.file.url} type="video/mp4" />
    //                     </video>
    //                 );
    //                 case "image/png":
    //                 return (
    //                     <img
    //                     src={`https://${node.data.target.fields.file.url}`}
    //                     height={node.data.target.fields.file.details.image.height}
    //                     width={node.data.target.fields.file.details.image.width}
    //                     alt={node.data.target.fields.description}
    //                     />
    //                 );
    //                 default:
    //                 return "Nothing to see here...";
    //             }
    //         },
    //     },
    // };

    // documentToReactComponents(fulldescription.json, renderOptions)
}