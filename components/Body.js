import RestaurentCard from "./RestaurentCard"
import { useEffect, useState } from "react"
import { FOODFIRE_API_URL } from "../utils/constant"
import Shimmer from "./Shimmer"
import { set } from "@cloudinary/url-gen/actions/variable"
import { Link } from "react-router-dom"

const Body = () => {
  const [resList, setResList] = useState([])
  const [searchText, setSearchText] = useState("")
  const [allresto, setallresto] = useState([])

  useEffect(() => {
    getRestaurants()
  }, [])

  const getRestaurants = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5074&lng=73.8077&page_type=DESKTOP_WEB_LISTING"
      )
      const json = await response.json()

      const checkJsonData = (jsonData) => {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants

          if (checkData !== undefined) {
            return checkData
          }
        }
      }

      const restaurantData = checkJsonData(json)
      setResList(restaurantData || [])
      setallresto(restaurantData || [])
    } catch (error) {
      console.log("Failed to fetch data:", error)
    }
  }

  const filterTopRated = () => {
    const filteredList = allresto.filter((res) => res?.info?.avgRating > 4)
    setResList(filteredList)
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          ></input>
          <button
            onClick={() => {
              const filterResto = allresto.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              )
              setResList(filterResto)
            }}
          >
            Search
          </button>

          <button className="filter-btn" onClick={filterTopRated}>
            Top Rated Restaurants
          </button>
        </div>

        <div className="res-container">
          {resList?.length === 0 ? (
            <Shimmer></Shimmer>
          ) : (
            resList.map((restaurant) => (
              <Link
                to={"/restaurants/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurentCard resData={restaurant} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Body
