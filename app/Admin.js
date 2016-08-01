import React from 'react';
import moment from 'moment';

class Admin extends React.Component{

	render(){
		var idIndex = 1;
		var bids = [];
		this.props.users.forEach(function(p){
			var cratedAt = moment(p.createdAt).format('D MMMM YY HH:mm');
			for(var i=0;i<p.bids.length;i++){
				bids.push({
					id : idIndex++,
					bidNumber: (i+1),
					companyName:p.companyName,
					bidAmount : p.bids[i].bidAmount,
					country : p.country,
					cratedAt : cratedAt
				});
			}
		});
		bids = bids.map(function(p){
			return (
				<tr key={p.id}>
					<td>{p.bidNumber}</td>
					<td>{p.companyName}</td>
					<td>{p.bidAmount}</td>
					<td>{p.country}</td>
					<td>{p.cratedAt}</td>
				</tr>
			);
		});
		return (
			<div className="container">
				<table className="table">
				    <thead>
				      <tr>
				        <th>Deal</th>
				        <th>Company Name</th>
				        <th>Bid $</th>
				        <th>Country</th>
				        <th>Timestamp</th>
				      </tr>
				    </thead>
				    <tbody>{bids}</tbody>
  				</table>
			</div>
		);
	}
}

export default Admin;