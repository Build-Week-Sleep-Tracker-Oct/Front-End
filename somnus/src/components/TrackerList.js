import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { fetchData } from '../actions';
import Chart from './Chart';
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

    const smiley = <span role="img" aria-labelledby='smiley'>😀</span>
    const ok = <span role="img" aria-labelledby='ok'>😐</span>
    const sad = <span role="img" aria-labelledby='sad'>😭</span>
    const angry = <span role="img" aria-labelledby='angry'>😡</span>

    return (
        <div className="tracker-list">
            <div className="tracker-content">
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
                <button className='searchButton' onClick={() => props.history.push('/search')}>Search</button>
                {props.data.map(item => {
                    if(Number(item.feels) === 1){
                        return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                    <p>{angry}</p>
                                    <p>{item.notes}</p>
                                    <p>{item.dateTimeFrom}</p>
                                    <p>{item.dateTimeTo}</p>
                                </div>
                    } else if(Number(item.feels) === 2) {
                        return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                    <p>{sad}</p>
                                    <p>{item.notes}</p>
                                    <p>{item.dateTimeFrom}</p>
                                    <p>{item.dateTimeTo}</p>
                                </div>
                    } else if(Number(item.feels) === 3) {
                        return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                    <p>{ok}</p>
                                    <p>{item.notes}</p>
                                    <p>{item.dateTimeFrom}</p>
                                    <p>{item.dateTimeTo}</p>
                                </div>
                    } else if(Number(item.feels) === 4) {
                        return <div className='entry' key={item.id} onClick={e => entryRoute(e, item)}>
                                    <p>{smiley}</p>
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
