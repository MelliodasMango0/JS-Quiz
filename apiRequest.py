import requests
import json

response = requests.get('https://mrapi.org/api/heroes-stats/pc?filter=competitiveSummary.name,competitiveSummary.pickRate')
data = response.json()
for hero in range(len(data['competitiveSummary']['name'])):
	if data['competitiveSummary']['name'][hero] == '神奇先生':
		data['competitiveSummary']['name'][hero] = 'Mr. Fantastic'
	if data['competitiveSummary']['name'][hero] == '隐形女':
		data['competitiveSummary']['name'][hero] = 'Invisible Woman'

newData = {}
newData['characters'] = []
'''
Example:
data:
	name: 'Mr. Fantastic'
	pickRate: '0.5%'

newData:
	{
		'characters': [
			{
				'name': 'Mr. Fantastic',
				'playRate': 0.5
				'image': 'images/Mr.Fantastic.jpeg' # Need to remove all the spaces in the name
			}
		]
	}
'''
for hero in range(len(data['competitiveSummary']['name'])):
	newData['characters'].append({
		'name': data['competitiveSummary']['name'][hero],
		'playRate': float(data['competitiveSummary']['pickRate'][hero][:-1]),
		'image': 'images/' + data['competitiveSummary']['name'][hero].replace(' ', '') + '.jpeg'
	})

# Write to a json file
with open('data.json', 'w') as outfile:
	json.dump(newData, outfile)
