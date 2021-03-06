import withRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'

import dynamic from 'next/dynamic' 

//异步加载组件，第二个参数配置加载前的显示
const MDRenderer = dynamic(
    () => import ('../../components/MarkdownRenderer'),
    // {
    //   loading: () => <p>loading</p>
    // }
  )

const Detail = ({readme}) => {
  return <MDRenderer content={readme.content} isBase64={true}/>
}
Detail.getInitialProps = async ({ctx}) => {
  const {owner, name} = ctx.query
  const readmeResp = await api.request({
    url: `/repos/${owner}/${name}/readme`
  }, ctx.req, ctx.res)
  return {
    readme: readmeResp.data
  }
}

export default withRepoBasic(Detail, 'index')