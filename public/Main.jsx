
var MyClock  = React.createClass({
    getInitialState: function () {  
        return {date: new Date()};  
    },
    componentDidMount() {
        this.timerID = setInterval(
              () => this.tick(),
              1000
          );
    },

    componentWillUnmount() {
        clearInterval(this.timerID);
    },
    tick() {
        this.setState({
          date: new Date()
        });
    },
    render: function(){
        return (
          <div className="pull-right">
            <h2> 
             Local Time : {this.state.date.toLocaleTimeString()}
            </h2>
          </div>
        );
    }
});

var StudentAll = React.createClass({
  getInitialState: function () {  
    return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', data1: []};  
  },

  handleChange: function(e) {  
    this.setState({[e.target.name]: e.target.value});  
  },

  componentDidMount() {
    $.ajax({  
       url: "api/getdata",  
       type: "GET",  
       dataType: 'json',  
       ContentType: 'application/json',  
       success: function(data) {           
         this.setState({data1: data});   
           
       }.bind(this),  
       error: function(jqXHR) {  
         console.log(jqXHR);  
             
       }.bind(this)  
    });  
  },  
    
  DeleteData(id){  
    var studentDelete = {  
          'id': id  
      };     
      
      $.ajax({  
        url: "/api/Removedata/",  
        dataType: 'json',  
        type: 'POST',  
        data: studentDelete,  
        success: function(data) {  
          alert(data.data);  
          this.componentDidMount();
    
        }.bind(this),  
        error: function(xhr, status, err) {  
          alert(err);   
        }.bind(this),  
      });  
  },
  EditData(item){           
    this.setState({
      name      : item.name,
      address   : item.address,
      contact   : item.contact,
      email     : item.email,
      id        : item._id,
      Buttontxt : 'Update'
    });  
  },  
    
  handleClick: function() {
    var Url="";  
    if(this.state.Buttontxt=="Save"){  
      Url="/api/savedata";  
      }  
    else{  
      Url="/api/Updatedata";  
    }  
    var studentdata = {  
      'name'      : this.state.name,  
      'address'   : this.state.address,  
      'email'     : this.state.email,  
      'contact'   : this.state.contact,  
      'id'        : this.state.id,       
    }

    $.ajax({  
      url: Url,  
      dataType: 'json',  
      type: 'POST',  
      data: studentdata,  
      success: function(data) {         
          alert(data.data);         
          this.setState(this.getInitialState());  
          this.componentDidMount();           
      }.bind(this),  
      error: function(xhr, status, err) {  
         alert(err);       
      }.bind(this)  
    });  
  },  
  
  render: function() {  
    return (   
      <div  className="container"  style={{marginTop:'50px'}}>
        <MyClock />
        <p className="text-center" style={{fontSize:'25px'}}><b> Demo Student managerment Using React,Nodejs,Express,MongoDB</b></p>  
        <form>  
          <div className="table-responsive">   
            <table className="table table-bordered table-striped">  
               <tbody>  
                <tr>  
                  <td className="text-nowrap"><b>Name</b></td>  
                  <td>  
                      <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
                      <input type="hidden" value={this.state.id}    name="id"  />  
                  </td>  
                </tr>
              
                <tr>  
                  <td className="text-nowrap"><b>Address</b></td>  
                  <td>  
                    <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />  
                  </td>  
                </tr>  
              
                <tr>  
                  <td className="text-nowrap"><b>Email</b></td>  
                  <td>  
                    <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />  
                  </td>  
                </tr>  

                <tr>  
                  <td className="text-nowrap"><b>Contact</b></td>  
                  <td>  
                    <input type="text"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />  
                  </td>  
                </tr>  
              
                <tr> 
                  <td colSpan="2">  
                    <input className="btn btn-primary pull-right" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
                  </td>  
                </tr>              
             </tbody>  
            </table>  
          </div>  
          <div className="col-sm-12 col-md-12 "  style={{marginTop:'50px'}} > 
          <div className="row">
            <table className="table-bordered table dataTable no-footer table-striped hover">
              <thead>
                <tr>
                  <th><b>No.</b></th>
                  <th><b>NAME</b></th>
                  <th><b>ADDRESS</b></th>
                  <th><b>EMAIL</b></th>
                  <th><b>CONTACT</b></th>
                  <th colSpan="2" className="text-center"><b>ACTION</b></th>
                </tr>
              </thead>
              <tbody>  
                  {this.state.data1.map((item, index) => (  
                    <tr key={index} className={index%2 == 0 ? "odd" : "even"}>  
                      <td>{index+1}</td>   
                      <td>{item.name}</td>                        
                      <td>{item.address}</td>  
                      <td>{item.email}</td>  
                      <td>{item.contact}</td>  
                      <td>           
                        <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>
                      </td>  
                      <td>
                        <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item._id)}}>Delete</button>
                      </td>   
                    </tr> 
                  ))}  
                </tbody>  
              </table>  
            </div> 
          </div> 
        </form>          
      </div>
    );  
  }  
});

ReactDOM.render(<StudentAll />, document.getElementById('root')) 