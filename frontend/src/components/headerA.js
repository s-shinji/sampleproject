import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {postSearch,postLogout} from '../actions'
import { Field, reduxForm} from 'redux-form'
import { withRouter } from 'react-router';





class HeaderA extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.logout = this.logout.bind(this)
  }

  async onSubmit(values) {
    await this.props.postSearch(values)
    await this.props.history.push('/search')
  }

  async logout() {
    await this.props.postLogout(this.props.loginUserId)
    await this.props.history.push('/login')
  }

  renderField(field) {
    const { input, type} = field
    return(
    <input className="form-control mr-sm-2" type={type} placeholder="Search" {...input} />
    )
  }


  render() {
    const {handleSubmit} = this.props
    const loginUserId = this.props.loginUserId


    return(
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          {/* loginUserIdが存在する場合表示 */}
          {loginUserId != 0 ?  
            <form role="form" id="logout" action="/logout" method="post" onSubmit={handleSubmit(this.logout)}>
              <button type="submit" className="navbar-brand">ログアウト</button>
            </form>
          : ""}
          {/* loginUserIdが存在しない場合表示 */}
          {loginUserId == 0 ? 
            <Link to="/login" id="login">
              <button type="submit" className="navbar-brand">ログイン</button>
            </Link>
          : ""}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/index"className="nav-link">ホーム <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                {loginUserId != 0 ? 
                  <Link to="/upload" className="nav-link">投稿</Link>
                : ""}
              </li>
              <li className="nav-item">
                {/* loginUserIdが存在する場合表示 */}
                {loginUserId != 0 ?
                  <Link to={`/user/${loginUserId}`} className="nav-link">マイページ</Link>
                : ""}
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0"  onSubmit={handleSubmit(this.onSubmit)}>
              {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="searchWord" id="searchForm"/> */}
              <Field name="searchWord" id="searchForm" type="text" component={this.renderField} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>  
    )
  }
      
}
const mapStateToProps = state => ({loginUserId : state.auth})
const mapDispatchToProps = ({postSearch,postLogout})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'searchForm'})(HeaderA)));
