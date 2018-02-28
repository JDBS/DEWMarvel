
function User(config){
	this.name=config.name;
	this.phone=config.phone;
	this.email=config.email;
	this.vote=config.vote;
	this.subscription;
}


User.prototype.getSaveArray=function(){
	return {
		name:this.name,
		phone:this.phone,
		email:this.email,
		vote:this.vote,
		subscription:this.subscription
	}
}

function loadUsers(){
	let usersData = load(CONFIG.voteListSave);
	let users=[];

	if(usersData)
		usersData.forEach(
			(userData)=>users.push(new User(userData))
		);
	return users;
}

function saveUsers(users){
	let usersData = [];
	users.forEach(
		(user)=>usersData.push(user.getSaveArray())
	);
	save(usersData,CONFIG.voteListSave);
}

function saveSingleUser(user){
	let users=loadUsers();

	users.push(user);

	saveUsers(users);
}