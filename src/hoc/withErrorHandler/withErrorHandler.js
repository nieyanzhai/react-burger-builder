import React, { Component } from "react";

import Auxiliary from "../Auxiliary/Axiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      reqInterceptor: null,
      resInterceptor: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      this.resInterceptor = axios.interceptors.response.use(
        resp => resp,
        err => this.setState({ error: err })
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error} clicked={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
