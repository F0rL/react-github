import {withRouter} from 'next/router'

const Search = ({router}) => {
  return (
    <span>search: {router.query.query}</span>
  )
};

export default withRouter(Search)
