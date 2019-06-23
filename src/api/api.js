import axios from 'axios'
import Qs from 'qs'

export const GET = "get";
export const POST = "post";

export const baseUrl = "http://mini-blog.com:31380";

// 登陆相关
export const Login = (user, pwd) => {
	return new axios({
		url: baseUrl + '/sso/login/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest'
		},
		data: {
			'username': user,
			'passwd': pwd
		},
		method: POST,
		withCredentials: true
	})
};

export const Register = (user, pwd) => {
	return new axios({
		method: POST,
		url: baseUrl + '/sso/regist/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			'username': user,
			'passwd': pwd
		},
		withCredentials: true
	})
};

export const Logout = () => {
	return new axios({
		url: baseUrl + '/sso/logout/',
		method: GET,
		withCredentials: true
	})
};

export const getUser = () => {
	return new axios({
		url: baseUrl + '/sso/getInfo/',
		method: GET,
		withCredentials: true
	})
};

// 博客相关
export const AllBlogs = () => {
	return new axios({
		url: baseUrl + '/blog/total',
		method: GET,
		withCredentials: true
	})
};

export const UserBlogs = (user) => {
	return new axios({
		url: baseUrl + '/blog/user/',
		method: GET,
		withCredentials: true,
		headers: {
			'End-User': user
		}
	})
};

export const ChangeBlog = (blogid, author, title, content, comment_num, date) => {
	return new axios({
		url: baseUrl + '/blog/modify/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			'blogid': blogid,
			'author': author,
			'title': title,
			'content': content,
			'comment_num': comment_num,
			'date': date
		},
		method: POST,
		withCredentials: true
	})
};

export const DeleteBlog = (blogid) => {
	return new axios({
		url: baseUrl + '/blog/delete/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			'blogid': blogid
		},
		method: POST,
		withCredentials: true
	})
};

export const AddBlog = (author, title, content, comment_num) => {
	return new axios({
		url: baseUrl + '/blog/add/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			'author': author,
			'title': title,
			'content': content,
			'comment_num': comment_num
		},
		method: POST,
		withCredentials: true
	})
};

// 评论相关
export const AllComments = (blogid) => {
	return new axios({
		url: baseUrl + '/comment/search/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			'blogid': blogid
		},
		method: POST,
		withCredentials: true
	})
};

export const AddComment = (blogid, author, content) => {
	return new axios({
		url: baseUrl + '/comment/add/',
		transformRequest: [function(data) { //在请求之前对data传参进行格式转换
			data = Qs.stringify(data)
			return data
		}],
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			'blogid': blogid,
			'author': author,
			'content': content,
		},
		method: POST,
		withCredentials: true
	})
};

// 排名相关
export const Rank = () => {
	return new axios({
		url: baseUrl + '/rank/',
		method: GET,
		withCredentials: true,
	})
};
