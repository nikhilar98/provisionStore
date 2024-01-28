import { useContext, useEffect, useState,memo } from "react"
import { appContext } from "../App"
import axios from 'axios'
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"


const Products = (props) => {

    const {appData,appDispatch} = useContext(appContext)
    const [search,setSearch] = useState("")
    const [filteredProducts,setFilteredProducts] = useState(appData.products)


    const getProducts = async () => { 
        try{
            const response = await axios.get('https://api.kalpav.com/api/v1/product/category/retail',{
                headers:{
                    Authorization:'bearer '+JSON.parse(localStorage.getItem('user')).access_token
                }
            })
            appDispatch({type:'SET_PRODUCTS',payload:response.data.response})
        }
        catch(err){
            console.log(err)
        }
    }

    const handleReset=()=>{
        setSearch('')
        setFilteredProducts(appData.products)
    }

    const handleSearch =(e) =>{ 
        e.preventDefault() 
        setFilteredProducts(
            appData.products.filter((product)=>{
                return product.productCategory?.productCategoryName?.toLowerCase().includes(search.toLowerCase())
            })
        )
    }

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        setFilteredProducts(appData.products)
    },[appData.products])

    const productsListing =  (filteredProducts.length ? 
        filteredProducts.map((product)=>{
           
            return  <Card
                        key={product.productCategory.productCategoryId} 
                        sx={{margin:'2rem 2rem',backgroundColor:"rgb(237, 189, 159)"}}>
                            <CardContent>
                            <Typography variant="body1">
                            {product.productCategory.productCategoryName}
                            </Typography>
                            <img src={product.productCategory.productCategoryImage} 
                            alt={`product-${product.productCategory.productCategoryId}`}/>
                            </CardContent>
                    </Card>
        })
        :  
        <p>No products available.</p>)
    
    console.log(appData.user)


    return (
                Object.keys(appData.user).length==0 
                ?
                <p> Please login to view the products.</p>

                :
        
                <>

                    <div className="products-container">
                        <h1>Our Products</h1>
                        <Box 
                            component='form'
                            onSubmit={handleSearch}
                            sx={{width:'50%',minWidth:'200px'}}>
                            <TextField 
                                value={search} 
                                onChange={(e)=>{setSearch(e.target.value)}} 
                                size="small"
                                sx={{minWidth:"180px"}}>
                            </TextField><br/>
                            <Box sx={{display:'flex',gap:'1rem',mt:'1rem'}}>
                                <Button 
                                    type='submit' 
                                    variant="contained" 
                                    size="small">
                                        Search
                                </Button>
                                <Button variant="contained" 
                                    onClick={handleReset}
                                    size="small">Reset
                                </Button>
                            </Box>
                        </Box>
                        <Box 
                            sx={{width:'50%',minWidth:'280px'}}>
                            {productsListing}
                        </Box>
                    </div>
                    <h3 style={{textAlign:"center"}}>
                        <Link to='/about' id='about-footer-link'>
                            About us
                        </Link>
                    </h3>
                </>
        
    )
}


export default memo(Products)