import React, { Component } from "react";
import { PageHeader, Button } from "react-bootstrap";
import "./Posts.css";

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      post: {}
    };
  }

  async componentDidMount() {
    try {
      const post = await this.getPost();
      this.setState({
        post
      });
    } catch (e) {
      alert(e);
    }
  }

  getPost() {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`)
    .then(response => response.json())
  }

  handleBackClick = event => {
    event.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="one-post">
        <Button className="go-back-button" onClick={this.handleBackClick} block>Go back</Button>
        <PageHeader>Details</PageHeader>
        <div className="content-data">
          <div className="user-id">UserId: {this.state.post.userId}</div>
          <div className="just-id">Id: {this.state.post.id}</div>
          <div className="post-title">Title: {this.state.post.title}</div>
          <div className="post-body">Body: {this.state.post.body}</div>
        </div>
      </div>
    );
  }
}
