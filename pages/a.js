import { withRouter} from 'next/router'

const A =  ({router}) => <p>a page id : {router.query.id}</p>

export default withRouter(A)