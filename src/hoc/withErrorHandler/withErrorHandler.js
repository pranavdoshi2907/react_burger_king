 import React, { Component } from 'react'
import Aux from '../Aux'
import Modal from '../../Components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent,axios) => {
    return class  extends Component {
        constructor(props) {
            super(props)
        
            this.state = {
                 error : null
            }
        }
        
         componentWillMount(){
         this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error : null
                })
                return req
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,err => {
                 this.setState({
                     error : err
                 })
             })
         }

         componentWillUnmount() {
            //  console.log('[withErrorHandler] componentWillUnmount',this.reqInterceptor,this.resInterceptor)
               axios.interceptors.request.eject(this.reqInterceptor)
               axios.interceptors.response.eject(this.resInterceptor)
         }

         errorConfirmedHandler = () => {
                this.setState({
                    error : null
                })
         }

        render(){
            return (
                <Aux>
                     <Modal show={this.state.error}
                     modalClosed={this.errorConfirmedHandler} >
                         {this.state.error ? this.state.error.message : null}
                     </Modal>
                <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}
export default withErrorHandler