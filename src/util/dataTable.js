const ignoreFields = ['id', 'full_name']
const columnTitles = {
	name: 'Name',
	abbreviation: 'Abbreviation',
    city: 'City',
    conference: 'Conference',
    division: 'Division',
}
const filterByValues = ['All','Abbreviation', 'City', 'Conference', 'Division']
module.exports = { ignoreFields, columnTitles, filterByValues };
