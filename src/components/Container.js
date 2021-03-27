import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from './Table'

function Container(){
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        getRandomUsers()
    }, [])

    async function getRandomUsers(){
        const result = await axios.get('https://randomuser.me/api/?results=20&seed=seed')
        setUsers(result.data.results)
    }

    function getSearchResults(){
        console.log('Searching for:', search)
        const searchedUser = users.filter(user => search.indexOf(user.name.first)> -1 || search.indexOf(user.name.last)> -1)
        console.log(searchedUser)
        setUsers(searchedUser)
    }

    function clearSearch(){
        setSearch("")
        getRandomUsers()
    }

    function handleInputChange(event){
        setSearch(event.target.value)
        console.log(event.target.value)
    }

    function handleFormSubmit(event){
        event.preventDefault()
        getSearchResults()
    }

    function sortName(){
        const sorted = users.sort( function(item1, item2){
            if(item1.name.last < item2.name.last){
                return -1
            }
            if (item1.name.last > item2.name.last){
                return 1
            }
            return 0
        })
        setUsers([...sorted])
    }

    return(
        <div className="container" style={{marginTop: "20px", marginBottom: "20px"}}>
            <div className="input-group mb-3 float-center">
                <input value={search} onChange={handleInputChange} type="text" className="form-control" placeholder="Search Employee by Name" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button className="btn btn-outline-danger" onClick={clearSearch}><i class="fas fa-window-close"></i></button>
                <button onClick={handleFormSubmit} className="btn btn-outline-primary" type="submit" id="button-addon2">Search</button>
            </div>
            <div style={{display: "flex", justifyContent: "center",  margin: "auto", color: "gray"}}>
                <p><small>Hover over the Name to Sort Employees Alphabetically</small></p>
            </div>
            <Table list={users} sortName={sortName}/>
        </div>
    )
}

export default Container