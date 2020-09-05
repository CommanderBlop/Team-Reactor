import React, { useContext, useEffect, useState } from 'react';
import FriendCell from './FriendCell';
function ChatBar(props) {
	const [userList, serUserList] = useState(['Sandy', 'Zack']);
	const Cells = userList.map((item) => <FriendCell avatar={''} name={item} />);
	return <div>{Cells}</div>;
}

export default ChatBar;
