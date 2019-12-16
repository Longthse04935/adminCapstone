import React, { Component } from "react";
import Config from '../Config';

class CateNLoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationData:[
            ],
            categoryData:[
            ],
            categoryInput:'',
            locationInput:'',
            data:{
            }
        }
      }

    loadData = async () =>{
      let autheticate = {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      };
      const response = await fetch(
        Config.api_url + "location/findAll",
        autheticate
      );
    
      if (!response.ok) {
        throw Error(response.status + ": " + response.statusText);
      }

      const responseCate = await fetch(
        Config.api_url + "category/findAll",
        autheticate
      );
    
      if (!responseCate.ok) {
        throw Error(responseCate.status + ": " + responseCate.statusText);
      }
      const locationData = await response.json();
      const categoryData = await responseCate.json();
      this.setState({locationData,categoryData});
    }

    async componentDidMount(){
      this.loadData();
    }

    onImageChange = async (event) => {
      let {data} = this.state;
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
      reader.onload = (event) => {
        data['image'] = event.target.result;
        this.setState({data});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    }

    handleChange = (e) =>{
      const { data } = this.state;
        const value = e.target.value;
        const name = e.target.name;
        
        data[name] = value;
        this.setState({ data });
    }


    handleAdd = async (param) => {
      let {data} = this.state;
      console.log(data);
      let autheticate = {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      };
      if(param === 'category'){
        const response = await fetch(
          Config.api_url + "category/create",
          autheticate
        );
      
        if (!response.ok) {
          throw Error(response.status + ": " + response.statusText);
        }
        this.setState({categoryInput : ''});
      }else if(param === 'location'){
        const response = await fetch(
          Config.api_url + "location/create?country="+data.country+"&city="+data.city+"&place="+data.place,
          autheticate
        );
      
        if (!response.ok) {
          throw Error(response.status + ": " + response.statusText);
        }
        this.setState({locationInput : ''});
      }
      this.loadData();
    }
    
    handleHideAdd = (param) =>{
      let {categoryInput,locationInput} = this.state;
      if(param === 'category'){
        categoryInput = '';
      }else{
        locationInput = '';
      }
      this.setState({categoryInput,locationInput});
   
    }

  showInput = (param) => {
    let {categoryInput,locationInput} = this.state;
    if(param === 'category'){
      categoryInput = <div className="form-group categoryForm">
                        {/* <input type="text" className="form-control addForm_Input" id="exampleFormControlInput1" name="category" onChange={this.handleChange} placeholder="Category"/> */}
                        <div style={{marginBottom:'20px'}}>
                        <input type="text" className="form-control addForm_Input" placeholder="Category" name="category" onChange={this.handleChange} placeholder="Category"/>
                        <label htmlFor="file-upload" className="custom-file-upload"> Upload image category
                        </label>
                        <input id="file-upload" type="file" name="image" onChange={this.onImageChange}/>
                        </div>
                        <span className="btn btn-primary btn-icon-split triggerA" onClick={()=>this.handleAdd('category')}>
                          <span className="text">Add</span>
                        </span>
                        <span style={{marginLeft:'5px'}} className="btn btn-primary btn-icon-split triggerA" onClick={()=>this.handleHideAdd('category')}>
                          <span className="text">Close</span>
                        </span>
                      </div>
    }else{
      locationInput = <div className="form-group locationForm">
                        <div style={{marginBottom:'20px'}}>
                        <input type="text" className="form-control locationForm_input" name="country" onChange={this.handleChange} placeholder="Country"/>
                        <input type="text" className="form-control locationForm_input"  name="city" onChange={this.handleChange} placeholder="City"/>
                        <input type="text" className="form-control locationForm_input" name="place" onChange={this.handleChange} placeholder="Place"/>
                        </div>
                        <span className="btn btn-primary btn-icon-split triggerA " onClick={()=>this.handleAdd('location')}>
                          <span className="text">Add</span>
                        </span>
                        <span style={{marginLeft:'5px'}} className="btn btn-primary btn-icon-split triggerA" onClick={()=>this.handleHideAdd('location')}>
                          <span className="text">Close</span>
                        </span>
                      </div>
    }
    this.setState({categoryInput,locationInput})
  }
  render() {
    let {categoryInput,locationInput,categoryData,locationData,image} = this.state;
    let category = categoryData.map((data, index) => (
        <tr role="row" className="odd" key={index}>
        <td className="sorting_1">{data.category} trip</td>
      </tr>
      ));

      let location = locationData.map((data, index) => (
        <tr role="row" className="odd" key={index}>
        <td className="sorting_1">{data.location}</td>
      </tr>
      ));

    return (
      <div className="container-fluid">
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Manage Category And Location
            </h6>
          </div>
          <div className="catNloc">
            <div className="category">
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="dataTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4"
                  >
                    <div
                      className="row"
                      style={{ textAlign: "center", marginBottom: "20px" }}
                    >
                      <div className="role">
                        <span className="btn btn-primary btn-icon-split guider-button" onClick={()=>this.showInput('category')}>
                          <span className="text">Add category</span>
                        </span>
                        {categoryInput}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table table-bordered dataTable"
                          id="dataTable"
                          width="100%"
                          cellSpacing={0}
                          role="grid"
                          aria-describedby="dataTable_info"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Name: activate to sort column descending"
                                style={{ width: 270 }}
                              >
                                Category
                              </th>

                            </tr>
                          </thead>
                          <tbody>{category}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="location">
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="dataTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4"
                  >
                    <div
                      className="row"
                      style={{ textAlign: "center", marginBottom: "20px" }}
                    >
                      <div className="role">
                        <span className="btn btn-primary btn-icon-split guider-button" onClick={()=>this.showInput('location')}>
                          <span className="text">Add location</span>
                        </span>
                        {locationInput}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table table-bordered dataTable"
                          id="dataTable"
                          width="100%"
                          cellSpacing={0}
                          role="grid"
                          aria-describedby="dataTable_info"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Name: activate to sort column descending"
                                style={{ width: 270 }}
                              >
                                Location
                              </th>
                            </tr>
                          </thead>
                          <tbody>{location}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CateNLoc;
