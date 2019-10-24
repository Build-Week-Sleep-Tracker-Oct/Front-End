import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { fetchData } from '../actions';
import Chart from './Chart';
import Search from './Search';
import { Route } from 'react-router-dom';
import Alarm from './Alarm';

const TrackerList = props => {
	if (!props.data) {
		return <Loader type='Rings' color='#00BFFF' height={100} width={100} />;
	}

    let feelToNum = props.data.map((item) => {
        return Number(item.feels)
    })
    
	let feelAvg = feelToNum.reduce((item, acc) => item + acc, 0);

	feelAvg = feelAvg / props.data.length;

    const entryRoute = (e, item) => {
        e.preventDefault()
        props.history.push(`/trackerlist/${item.id}`)
    }
    
   

	console.log(feelAvg, props.data);

    feelAvg = feelAvg / props.data.length

    // if(feelAvg === 4){
    //     return feelAvg = '😀'
    // } else if (feelAvg > 3 && feelAvg < 2){
    //     return feelAvg = '😐'
    // } else if (feelAvg > 2 && feelAvg < 3) {
    //     return feelAvg = '😭'
    // } else if(feelAvg >= 1 && feelAvg < 2) {
    //     return feelAvg = '😡'
    // }

    console.log(feelAvg, props.data)

    return (
        <div>
            <Chart />
            <Alarm />
                {props.isFetching ? 
                <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={100}
                    width={100}
                /> 
                : ''}
            <p className='avgFeel'>{feelAvg === 4 ? 'Your average sleep is 😀' : ''}</p>
            <p className='avgFeel'>{feelAvg >= 3 && feelAvg < 4 ? 'Your average sleep is 😐' : ''}</p>
            <p className='avgFeel'>{feelAvg >= 2 && feelAvg < 3 ? 'Your average sleep is 😭' : ''}</p>
            <p className='avgFeel'>{feelAvg >= 1 && feelAvg < 2 ? 'Your average sleep is 😡' : ''}</p>
            <Route render={() => <Search {...props} data={props.data} />} />
            {props.data.map(item => {
                if(Number(item.feels) === 1){
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😡</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else if(Number(item.feels) === 2) {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😭</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else if(Number(item.feels) === 3) {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😐</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else if(Number(item.feels) === 4) {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>😀</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>
                } else {
                    return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                <p>{item.feels}</p>
                                <p>{item.notes}</p>
                                <p>{item.dateTimeFrom}</p>
                                <p>{item.dateTimeTo}</p>
                            </div>

                }
            })}
            <button className='addEntryButton' onClick={() => props.history.push('/sleepentry')}>Add Entry</button>
            
        </div>
    )
}

const mapStatetoProps = state => {
	return {
		data: state.data,
		isFetching: state.isFetching,
		isPosting: state.isPosting,
		error: state.error,
	};
};

export default connect(
	mapStatetoProps,
	{ fetchData },
)(TrackerList);
