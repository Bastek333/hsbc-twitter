import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  FormGroup,
  FormControl,
  Button,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: [],
      searchKeyword: ''
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const posts = await this.posts();
      this.setState({ posts });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  posts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
  }

  handlePostClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  handleSearchChange = event => {
    this.setState({
      searchKeyword: event.target.value
    });
  }

  handleLogout = async event => {
    await true;
    sessionStorage.clear();

    this.props.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  renderPostsList(posts) {
    const listOfPosts = posts.map(
      (post) =>
        ((post.body && post.body.includes(this.state.searchKeyword) || post.title && post.title.includes(this.state.searchKeyword)))
          ? <ListGroupItem
              key={post.id}
              href={`/post/${post.id}`}
              onClick={this.handlePostClick}
              header={"UserId: " + post.userId}
            >
              {"Title: " + post.title}
            </ListGroupItem>
          : ''
    );

    const sortedList = listOfPosts.reverse();

    const filteredList = sortedList.filter( (item) => item !== '' );

    return filteredList;
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>HSBC</h1>
        <p>Twitter</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  divideArray(arr) {
    const groups = [];
    const listLength = this.renderPostsList(this.state.posts).length;
    let chunkSize = listLength / 3
    const chunkSizeModulo = listLength % 3
    chunkSize = chunkSize + chunkSizeModulo;

    for (let i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  renderWall() {
    const fullList = this.renderPostsList(this.state.posts);

    const listForGridOne = this.divideArray(fullList)[0];
    const listForGridTwo = this.divideArray(fullList)[1];
    const listForGridThree = this.divideArray(fullList)[2];

    return (
      <Grid>
        <Row className="navigation">
          <Col xs={12} sm = {6} md={4} >
            <Button onClick={this.handleLogout} bsSize="large" block>Logout</Button>
          </Col> 
          <Col xs={12} sm = {6} md={8} >
            {this.renderSearch()}
          </Col>
        </Row>
        <Row className="posts">
          {this.renderPostsList(this.state.posts).length ?  
          <div>
            <Col xs={12} sm = {6} md={4} >    
              <ListGroup>
                {!this.state.isLoading && listForGridOne}          
              </ListGroup>
            </Col>
            <Col xs={12} sm = {6} md={4} >    
              <ListGroup>
                {!this.state.isLoading && listForGridTwo}          
              </ListGroup>
            </Col>
            <Col xs={12} sm = {6} md={4} >    
              <ListGroup>
                {!this.state.isLoading && listForGridThree}          
              </ListGroup>
            </Col>
          </div>
          : "No posts found"}
        </Row>
      </Grid>
    );
  }

  renderSearch() {
    return (
      <div className="Search">
        <FormGroup controlId="search" bsSize="large">
          <FormControl
            autoFocus
            type="text"
            placeholder="Search"
            value={this.state.searchKeyword}
            onChange={this.handleSearchChange}
          />
        </FormGroup>
      </div>
    )
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderWall() : this.renderLander()}
      </div>
    );
  }
}
