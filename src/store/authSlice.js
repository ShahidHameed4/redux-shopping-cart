import axios from 'axios'
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');



// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            }
            )
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.message
            })
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
            }
            )
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            }
            )
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.message
            }
            )

    },

})



export const { reset } = authSlice.actions
export default authSlice.reducer

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
    try {

        var response = await  axios.post('http://localhost:5000/api/Residents/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data.token))
        }
        console.log(response.data)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }

})

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
    try {

        return await  axios.post('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }

})

       


    


