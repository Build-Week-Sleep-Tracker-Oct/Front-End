import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'



const Chart = props => {
    let sleepFrom = props.data.map(item => {
        return new Date(item.dateTimeFrom).getHours()
    })

    let sleepTo = props.data.map(item => {
        return new Date(item.dateTimeTo).getHours()
    })

    let feelingNumber = props.data.map(item => {
      return Number(item.feels) * 3
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
          if(item > 0) {
            return item
          } else {
            return item + 24
          }
        })

        
        return newArray3.filter(item => Number.isInteger(item))
      }

    let nightlyData = compare(sleepFrom, sleepTo)

    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [{
                label: 'Time Slept',
                borderColor: 'white',
                data: nightlyData,
                
            },{
                label: 'Feels',
                borderColor: 'yellow',
                data: feelingNumber
            }]
    }
    const options = {
      maintainAspectRation: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Hours Slept'
          },
          gridLines: {
            display: true,
            color: "black"
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Entry Number'
          },
          gridLines: {
            display: true,
            color: "black"
          },
        }]
      }
    }
    return (
        <div className='chart'>
            <Line
            width={125}
            height={100} 
            options={options}
            data={data} />
        </div>
    )
}

const mapStatetoProps = state => {
    return {
        data: state.data
    }
}


export default connect(
    mapStatetoProps,
    {  }
)(Chart)