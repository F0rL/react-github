import withRepoBasic from '../../components/with-repo-basic'

const Detail = ({text}) => {
  return <span>Detail: {text}</span>
}
Detail.getInitialProps = async () => {
  return {
    text: 123
  }
}

export default withRepoBasic(Detail, 'index')