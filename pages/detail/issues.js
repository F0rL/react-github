import withRepoBasic from '../../components/with-repo-basic'

const Issues = ({text}) => {
  return <span>Detail: {text}</span>
}
Issues.getInitialProps = async () => {
  return {
    text: 321
  }
}

export default withRepoBasic(Issues, 'issues')