import React, { useState } from "react";
import "./Categorylist.css";
import upload_area from "./Assets/upload_area.svg"; 

const Categorylist = () => {
  const[image,setImage] = useState(false); 
  const [category,setCategory] = useState({ 
      name:"", 
      image:"", 
      description:""
  }); 

  const changeHandler = (e) => { 
    console.log(e); 
    setCategory({...category,[e.target.name]:e.target.value}); 
    } 
 
  const imageHandler = (e) => { 
    setImage(e.target.files[0]); 
    } 

  return (
    
    <div className="category_box">
     
    <div className="addcategory"> 
    <h1>Categories</h1>
      <div className="addproduct-itemfield"> 
        <p>Category</p> 
        <input type="text" name="name" value={category.name} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" /> 
      </div> 
      <div className="addproduct-itemfield"> 
        <p>Description</p> 
        <input type="text" name="description" value={category.description} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" /> 
      </div> 
      
      
      <div className="addproduct-itemfield"> 
        <p>image</p> 
        <input onChange={(e)=>{imageHandler(e)}} type="file" name="image" id="file-input" /> 
      </div> 
      <button className="addproduct-btn" >ADD</button> 
    </div> 
    <div className="table">

    <div className="side_table">
    <table className="table">
        <thead>
            <tr>
                <th>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th className="text-end"> Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                </td>
                <td>1</td>
                <td><b>Men clothes</b></td>
                <td>Men clothes</td>
                <td className="text-end">
                    <div className="dropdown">
                        <a data-bs-toggle="dropdown" className="btn btn-light" href="/category">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/category">     Edit info </a>
                            <a className="dropdown-item text-danger" href="/category"> Delete</a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
    
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                </td>
                <td>1</td>
                <td><b>Men clothes</b></td>
                <td>Men clothes</td>
                <td className="text-end">
                    <div className="dropdown">
                        <a data-bs-toggle="dropdown" className="btn btn-light" href="/category">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/category">Edit info </a>
                            <a className="dropdown-item text-danger" href="/category"> Delete</a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
    
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                </td>
                <td>1</td>
                <td><b>Men clothes</b></td>
                <td>Men clothes</td>
                <td className="text-end">
                    <div className="dropdown">
                        <a data-bs-toggle="dropdown" className="btn btn-light" href="/category">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/category">Edit info </a>
                            <a className="dropdown-item text-danger" href="/category"> Delete</a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
    
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                </td>
                <td>1</td>
                <td><b>Men clothes</b></td>
                <td>Men clothes</td>
                <td className="text-end">
                    <div className="dropdown">
                        <a data-bs-toggle="dropdown" className="btn btn-light" href="/category">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/category">Edit info </a>
                            <a className="dropdown-item text-danger" href="/category"> Delete</a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
    
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                </td>
                <td>1</td>
                <td><b>Men clothes</b></td>
                <td>Men clothes</td>
                <td className="text-end">
                    <div className="dropdown">
                        <a data-bs-toggle="dropdown" className="btn btn-light" href="/category">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/category">Edit info </a>
                            <a className="dropdown-item text-danger" href="/category"> Delete</a>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
    
            </tr>
        </tbody>
    </table>
</div>
    </div>


    </div>

  );
};

export default Categorylist;
