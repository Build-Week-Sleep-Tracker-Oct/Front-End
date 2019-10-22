import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import Moment from 'react-moment';

const Chart = props => {

    console.log(props.data)
    let sleepFrom = props.data.map(item => {
        // return item.dateTimeFrom
        return new Date(item.dateTimeFrom).getHours()
    })

    let sleepTo = props.data.map(item => {
        return new Date(item.dateTimeTo).getHours()
    })

    function compare(arr1, arr2){
        let newArray = []
        let newArray2 = []
        let index1 = 0
        let index2 = 0
        let index3 = 0
        let c = 2
        
        for(let i = 0; i < arr1.length + arr2.length; i++) {
          if(c % 2 === 0 ) {
            newArray = [...newArray, arr2[index2]]
            index2++
          } else {
            newArray = [...newArray, arr1[index1]]
            index1++
          }
          c++
        }
        
        for(let i = 0; i < newArray.length; i++){
          newArray2 = [...newArray2, newArray[index3] - newArray[index3 + 1]]
          index3 = index3 + 2
        }
        
        let newArray3 = newArray2.map(item => {
          return item + 24
        })
        
        return newArray3.filter(item => Number.isInteger(item))
      }

    let nightlyData = compare(sleepFrom, sleepTo)

    const data = {
        labels: ['1', '2', '3', '4', '5', '6'],
        xAxisID: ['Hours Slept'],
        yAxisID: ['Day of the Month'],
        datasets: [
            {
                label: 'Time Slept',
                borderColor: 'purple',
                data: nightlyData
            },
            // {
            //     label: '',
            //     // backgroundColor: 'purple',
            //     data: [12, 18, 10, 3]
            // }
        ]
    }
    return (
        <div className='chart'>
            <Line 
            // options={{ maintainAspectRatio: false }}
            data={data} />
        </div>
    )
}

const mapStatetoProps = state => {
    return {
        data: state.data,
        isFetching: state.isFetching,
        isPosting: state.isPosting,
        error: state.error
    }
}


export default connect(
    mapStatetoProps,
    {  }
)(Chart)