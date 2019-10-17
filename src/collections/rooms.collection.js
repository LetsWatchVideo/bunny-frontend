export default {
	data: {
		currentRoomID: null,
		currentRoomName: null,
		room: [],
		remoteToken: null
	},
	groups: ['room'],
	persist: ['remoteToken'],
	routes: {
		takeRemote(request, name, token) {
			return request.get('room/remote/take', {
				Authorization: token
			});
		},
		getRoom(request, name, token) {
			return request.get('room/' + name, {
				Authorization: token
			});
		},
		createRoom(request, name, password) {
			return request.post('room', {
				name,
				password
			});
		}
	},
	actions: {
		getRoom({ routes }, name) {
			return routes.getRoom(name, base.accessToken).then(res => {
				if (!res.room) {
					return Promise.reject(res);
				}
				rooms.currentRoomName = name;
				rooms.currentRoomID = res.room.id;
				rooms.remoteToken = res.room.token;
				delete res.room.token;
				rooms.collect(res.room, 'room');
			});
		}
	},
	filters: {
		myRoom: ({ rooms }) => {
			return rooms.room.find(t => t.id === rooms.currentRoomID);
		}
	}
};
