import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import PubSub from 'pubsub-js'
import './index.css';
// var stringss = "null";
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: '', content: '', option: ''};

    this.handleChangeRadio    = this.handleChangeRadio.bind(this);
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.handleChangeSelect   = this.handleChangeSelect.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
  }

  handleChangeRadio(event) {
    this.setState({
      checked: event.target.value
    });
  }

  handleChangeTextarea(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleChangeSelect(event) {
    this.setState({
      option: event.target.value
    });
  }

  handleSubmit(event) {
    // stringss = 'item:' + this.state.checked+',content:' + this.state.content+',value:' + this.state.option;
    // console.info(this.state.checked);
    PubSub.publish('forms', {
      checked: this.state.checked,
      content: this.state.content,
      option:  this.state.option
    });
    event.preventDefault();
  }

  // hiddenModel(event) {
  //   console.info($('#myModal'));
  //   $('div#myModal').modal('hide');
  //   // event.preventDefault();
  // }
  // onclick(props) {
  //   // console.info(this.state.checked);
    

  // }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="radio-inline">
          <label>
            <input type="radio" name="item" value="add" onChange={this.handleChangeRadio} />
            加分项
          </label>
        </div>
        <div className="radio-inline">
          <label>
            <input type="radio" name="item" value="minus" onChange={this.handleChangeRadio} />
            扣分项
          </label>
        </div>
        <div className="form-group">
          <label>
            打分项内容:
          </label>
          <textarea className="form-control" value={this.state.content} onChange={this.handleChangeTextarea} />
        </div>
        <div className="form-group">
          <label>
            分值：
          </label>
          <div className={this.state.checked==='minus' ? 'input-group' : ''}>
            <div className={this.state.checked==='minus' ? 'input-group-addon' : 'hidden-radio'}>-</div>
              <select className="form-control modal-select" value={this.state.option} onChange={this.handleChangeSelect}>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        <button id="js-modal-submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

var TableComponent = React.createClass ({
  getInitialState: function() {
    return {
      checked: '',
      content: '',
      option:  ''
    };
  },

  componentDidMount: function() {
    this.pubsub_token = PubSub.subscribe('forms', function (topic, props) {
      // console.info(props.checked);
      this.setState({
        checked: props.checked,
        content: props.content,
        option:  props.option
      })
      
    }.bind(this));
    console.info(this.state);
  },

  componentWillUnmount: function() {
    PubSub.unsubscribe(this.pubsub_token);
  },

  render: function() {

    return (
      <tr>
        <td>{this.state.checked}</td>
        <td>{this.state.content}</td>
        <td>{this.state.option}</td>
        <td></td>
        <td><a>停用</a></td>
        <td><a>编辑</a></td>
        <td><a>删除</a></td>
      </tr>
    );
  }
})

function App() {
  return (
    <div className="container">
      <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#myModal">新建打分项</button>
      <div className="row">
        <table className="table">
        <thead>
          <tr>
            <th>计分类型</th>
            <th>打分项内容</th>
            <th>分值</th>
            <th>是否生效</th>
            <th colSpan="3">操作</th>
          </tr>
        </thead>
        <tbody>
          <TableComponent />
        </tbody>
      </table>
      </div>
      <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span>&times;</span><span className="sr-only">Close</span></button>
              <h4 className="modal-title" id="myModalLabel">新建打分项</h4>
            </div>
            <div className="modal-body">
              <FlavorForm />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
  );

// function GradeItem(props) {
  
// }

// class GradeItem extends React.Component {
  
// }

/* -----------我是万恶的分割线-------------------------------- */
//  var UserGist = React.createClass({
//   getInitialState: function() {
//     return {
//       username: '',
//       lastGistUrl: ''
//     };
//   },

//   componentDidMount: function() {
//     this.serverRequest = $.get(this.props.source, function (result) {
//       var lastGist = result[0];
//       this.setState({
//         username: lastGist.owner.login,
//         lastGistUrl: lastGist.html_url
//       });
//     }.bind(this));
//   },

//   componentWillUnmount: function() {
//     this.serverRequest.abort();
//   },

//   render: function() {
//     return (
//       <div>
//         {this.state.username} 用户最新的 Gist 共享地址：
//         <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
//       </div>
//     );
//   }
// });

// ReactDOM.render(
//   <UserGist source="https://api.github.com/users/octocat/gists" />,
//   document.getElementById('root')
// );


// var RepoList = React.createClass({
//   getInitialState: function() {
//     return {
//       loading: true,
//       error: null,
//       data: null
//     };
//   },

//   componentDidMount() {
//     this.props.promise.then(
//       value => this.setState({loading: false, data: value}),
//       error => this.setState({loading: false, error: error}));
//   },

//   render: function() {
//     if (this.state.loading) {
//       return <span>Loading...</span>;
//     }
//     else if (this.state.error !== null) {
//       return <span>Error: {this.state.error.message}</span>;
//     }
//     else {
//       var repos = this.state.data.items;
//       var repoList = repos.map(function (repo, index) {
//         return (
//           <li key={index}><a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}</li>
//         );
//       });
//       return (
//         <main>
//           <h1>Most Popular JavaScript Projects in Github</h1>
//           <ol>{repoList}</ol>
//         </main>
//       );
//     }
//   }
// });

// ReactDOM.render(
//   <RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')} />,
//   document.getElementById('root')
// );

/* -----------我是万恶的分割线-------------------------------- */
// class ProductCategoryRow extends React.Component {
//   render() {
//     return <tr><th colSpan="3">{this.props.category}</th></tr>;
//   }
// }

// class ProductRow extends React.Component {
//   render() {
//     var name = this.props.product.stocked ?
//     this.props.product.name:
//     <span style={{color: 'red'}}>
//       {this.props.product.name}
//     </span>;
//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{this.props.product.price}</td>
//         <td>{this.props.product.category}</td>
//       </tr>
//     );
//   }
// }

// class ProductTable extends React.Component {
//   render() {
//     var rows = [];
//     var lastCategory = null;
//     var categoryArr = [];
//     var flag = false;
//     this.props.products.forEach(function(product) {
//       if (product.category !== lastCategory) {
//         rows.push(<ProductCategoryRow category={product.category} />);
//         // console.info(categoryArr);
//         // categoryArr.forEach(function(index) {
//         //   // console.info("&&&"+i);
//         //   if(product.category == index) {
//         //     flag = true;
//         //   }
//         }
//         rows.push(<ProductRow product={product} category={product.category} />);
//       //   if(flag)
//       //   {
//       //     console.info('😯😯😯');
//       //     var mytable = document.getElementById('mytable');
//       //     var kk = <ProductRow product={product} category={product.category} />;
//       //     var ss = <ProductCategoryRow category={product.category} />
//       //     console.info("@s");
//       //     console.info(ss);
//       //     console.info("@k");
//       //     console.info(kk);
//       //     rows.push(kk);
//       //     ss.parentNode.insertBefore(kk, ss.nextSibling);
          
//       //   }
//       //   else
//       //   {
//       //     console.info('😢😢😢');
//       //     rows.push(<ProductCategoryRow category={product.category} />);
//       //     rows.push(<ProductRow product={product} category={product.category} />);
//       //   }
//       // }
//       lastCategory = product.category;
//       categoryArr.push(lastCategory);
//       // console.info(categoryArr);
//     });
//     // console.info(rows);
//     return (
//       <table id="mytable">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows}
//         </tbody>
//       </table>
//     );
//   }
// }

// class SearchBar extends React.Component {
//   render() {
//     return (
//       <form>
//         <input type="text" placeholder="Search..." />
//         <p>
//           <input type="checkbox" />
//           {'  '}
//           Only show products in stock
//         </p>
//       </form>
//     );
//   }
// }

// class FilterableProductTable extends React.Component {
//   render() {
//     return (
//       <div>
//         <SearchBar />
//         <ProductTable products={this.props.products} />
//       </div>
//     );
//   }
// }

// var PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.9999', stocked: true,  name: 'Football'},
//   {category: 'Sporting Goods', price: '$39.9',    stocked: false, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$39.9',    stocked: false, name: 'Baseball1'},
//   {category: '11111111',       price: '$9.9',     stocked: true,  name: 'Basketball'},
//   {category: 'Electronices',   price: '$9.9',     stocked: true,  name: 'iPod Touch'},
//   {category: 'Electronices',   price: '$19.9',    stocked: true,  name: 'iphone'},
//   {category: 'Electronices',   price: '$19.9',    stocked: true,  name: 'iphone12'},
//   {category: '22222222',       price: '$29.9',    stocked: false, name: 'Nexus'}
// ];

// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('root')
//   );
/* -----------我是万恶的分割线-------------------------------- */
// class FlavorForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: 'coconut'};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('Your favorite flavor is: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Pick your favorite La Croix flavor:
//           <select value={this.state.value} onChange={this.handleChange}>
//             <option value="grapefruit">Grapefruit</option>
//             <option value="lime">Lime</option>
//             <option value="coconut">Coconut</option>
//             <option value="mango">Mango</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// ReactDOM.render(
//   <FlavorForm />,
//   document.getElementById('root')
// );

/* -----------我是万恶的分割线-------------------------------- */
// class EssayForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Please write an essay about your favorite DOM element.'
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     // alert('An essay was submitted: ' + this.state.value);
//     var div = document.getElementById('mydiv');
//     div.innerHTML=this.state.value;
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <textarea value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//         <div id="mydiv"></div>
//       </form>

//     );
//   }
// }

// ReactDOM.render(
//   <EssayForm />,
//   document.getElementById('root')
// );

/* -----------我是万恶的分割线-------------------------------- */
// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value.toUpperCase()});
//   }//when inputing, the letter well turn to upper case.

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// ReactDOM.render(
//   <NameForm />,
//   document.getElementById('root')
//   );

/* -----------我是万恶的分割线-------------------------------- */
// class Toggle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {isToggleOn: true};
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     this.setState(prevState => ({
//       isToggleOn: !prevState.isToggleOn
//     }));
//     var kk = document.getElementById("check_1");
//     if(this.state.isToggleOn) {
//       console.info('true');
//       kk.setAttribute("value", "on");
//     }
//     else
//     {
//       console.info('false');
//       kk.setAttribute("value", "off");
//     }
//     console.info(kk.getAttribute("value"));
//   }

//   render() {
//     return (
//       <div>
//         <section id="check_frame" >
//           <input id="check_1" className="checkbox" type="checkbox" onClick={this.handleClick} />
//           <label htmlFor="check_1" className="trigger"></label>
//         </section>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Toggle />,
//   document.getElementById('root')
// );
/* -----------我是万恶的分割线-------------------------------- */
// function ActionLink() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }

//   return (
//     <a href="#" onClick={handleClick} >
//       click me
//     </a>
//   );
// }

// ReactDOM.render(
//   <ActionLink />,
//   document.getElementById('root')
// );
/* -----------我是万恶的分割线-------------------------------- */
// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }
//   render() {
//     return (
//       <div>
//         <h1>hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );
/* -----------我是万恶的分割线-------------------------------- */
// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

/* -----------我是万恶的分割线-------------------------------- */
// function Avatar(props) {
//   return (
//     <img className="Avatar"
//       alt={props.user.name}
//     />
//     );
// }

// function UserInfo(props) {
//   return (
//     <div className="UserInfo">
//       <Avatar user={props.user} />
//       <div className="UserInfo-name">
//           {props.user.name}
//       </div>
//     </div>
//     );
// }

// function Comment(props) {
//   return (
//     <div className="Comment">
//       <UserInfo user={props.author}/>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//     </div>
//   );
// }

// const comment = {
//   author: {
//     name: 'Lynne'
//   },
//   text: '12345678'
// }

// function App(props) {
//   return (
//     <div>
//       <Comment author={comment.author} text={comment.text} />
//     </div>
//   );
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
//   )
/* -----------我是万恶的分割线-------------------------------- */
// function Comment(props)
// {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <img className="Avatar"
//           alt={props.author.name}
//         />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//     </div>
//     );
// }

// function App()
// {
//   // <Author name="Lynne" />
//   return (
//     <div>
//       <Comment author={{name: 'hshs'}} text="121212121" />
//     </div>
    
//     );
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
// function Welcome(props)
// {
//   return <h1>Hello, {props.name}</h1>;
// }

// function App()
// {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//     );
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
