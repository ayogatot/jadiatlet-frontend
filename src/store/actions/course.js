import Endpoint from '../apis/Endpoint'
import Cookies from 'js-cookie'

export const addCourse = data => dispatch => {
  const token = Cookies.get('token')
  console.log(data)
  Endpoint.post(`/users/${data.coachId}/course`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => {
      console.log(response.data)
      if (response.status === 200) {
        console.log('masuk')
        // dispatch({ type: 'ADD_COURSE', payload: response.data.newCourse })
        // getCourse(data)
        Endpoint.get(`/users/${data.coachId}/course`)
          .then(response => {
            if (response.status === 200) {
              console.log('masuk 2')
              console.log(response.data.course)
              dispatch({ type: 'GET_COURSE', payload: response.data.course })
            }
          })
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
}

export const getCourse = data => dispatch => {
  console.log('masuk 3')

  Endpoint.get(`/users/${data.coachId}/course`)
    .then(response => {
      if (response.status === 200) {
        console.log('masuk 2')
        console.log(response.data.course)
        dispatch({ type: 'GET_COURSE', payload: response.data.course })
      }
    })
    .catch(err => console.log(err))
}
