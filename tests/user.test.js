const supertest = require('supertest');
const app = require('../index');
const User = require('../model/user');
// describe('#user', () => {
//  beforeAll(async () => {
//   const response = await supertest(app)
//    .post('/api/user/sign-up')
//    .send({
//     name: 'Ali Hamza',
//     email: 'ali@gmail.com',
//     password: '123456',
//   })
//   .expect(201);
//   console.log("response is", response)
// });
// afterAll(async () => {
//  await User.deleteMany();
// });

// describe('#handleSignUp', () => {
//   describe('should not register user', () => {
//    describe('when email already exists', () => {
//     test('return success false', async () => {
//      const response = await supertest(app)
//       .post('/api/user/sign-up')
//       .send({
//        name: 'Ayush Kumar',
//        email: 'ali@gmail.com',
//        password: '123456',
//       })
//       .expect(400);
//      expect(response.body.message).toBe('User already exists');
//    });
//   });
//   describe('when passowrd is missing', () => {
//    test('return success false', async () => {
//     const response = await supertest(app)
//      .post('/api/user/sign-up')
//      .send({
//       name: 'Ayush Kumar',
//       email: 'ayush+1@gmail.com',
//      })
//      .expect(400);
//     expect(response.body.message).toBe('User validation failed: email: Please enter a valid email, password: Path `password` is required.');
//    });
//   });
//   describe('when name is missing', () => {
//    test('return success false', async () => {
//     const response = await supertest(app)
//      .post('/api/user/sign-up')
//      .send({
//       email: 'ayush+1@gmail.com',
//       password: 'password',
//      })
//     .expect(400);
//    expect(response.body.message).toBe('User validation failed: email: Please enter a valid email, name: Path `name` is required.');
//    });
//   });
//   describe('when email is missing', () => {
//    test('return success false', async () => {
//     const response = await supertest(app)
//      .post('/api/user/sign-up')
//      .send({
//       name: 'Ayush Kumar',
//       password: 'password',
//      })
//      .expect(400);
//     expect(response.body.message).toBe('User validation failed: email: Email required');
//     });
//    });
//   });
//   describe('should create user', () => {
//    describe('when details is valid', () => {
//     test('should return success true', async () => {
//      const res = await supertest(app)
//       .post('/api/user/sign-up')
//       .send({
//        name: 'Ayush Kumar',
//        email: 'kumarayush731@gmail.com',
//        password: '123456',
//       })
//       .expect(201);
//      expect(res.body.message).toBe('User created successfully');
//      expect(res.body.user.name).toBe('Ayush Kumar');
//      expect(res.body.user.email).toBe('kumarayush731@gmail.com');
//     });
//    });
//   });
//  });

 
// });

 describe('#handleAllUser', () => {
   describe('should not get all user', () => {
     describe('when no user exists in database', () => {
       test('return success false', async () => {
     const response = await supertest(app)
      .get('/api/user')
      .expect(404);
     expect(response.body.message).toBe('User not found');
      });
     })
   })
   describe('should get all user', () => {
     describe('when user exist in database', () => {
       test('return success true', async () =>{
        const response = await supertest(app)
      .get('/api/user')
      .expect(201);
      expect(response.body.message).toBe('User found successfully');
       })
     })
   })
 })
 
 describe('#handle single user', () => {
    describe('should not  get single user', () => {
   describe('when user not exist in database', () => {
     test('return sucess true',async () =>{
       const userId = '623c98059cb44bfa1076a95d'
       const response = await supertest(app)
      .get(`/api/user/${userId}`)
      .expect(404);
      console.log("single user")
      expect(response.body.message).toBe('User not found');
     })
   })
 })
 describe('should get single user', () => {
   describe('when user exist in database', () => {
     test('return sucess true',async () =>{
       const res = await supertest(app)
        .post('/api/user/sign-up')
        .send({
        name: 'Ali Hamza',
        email: 'ali@gmail.com',
        password: '123456',
  })
  .expect(201);
        console.log("response is", res._body.user._id)
       const response = await supertest(app)
      .get(`/api/user/${res._body.user._id}`)
      .expect(201);
      expect(response.body.message).toBe('User found successfully');
     })
   })
 })
 })

 describe('#handleDeleteUser', () => {
   describe('should not delete user' , () => {
     describe('when user id is invalid', () => {
       test('return success false', async () => {
          const userId = '623c98059cb44bfa1076a95d'
          const response = await supertest(app)
          .get(`/api/user/${userId}`)
          .expect(404);
           expect(response.body.message).toBe('User not found');

       })
     })
   })

   describe('should delete  the user', () => {
     describe('when user id is valid', () => {
       test('return success true',  async () => {
         const userId = '623dbcb28210ea65a44d4f93'
           const response = await supertest(app)
          .delete(`/api/user/${userId}`)
          .expect(200);
           expect(response.body.message).toBe('User deleted successfully');
       })
     })
   })
 })

 describe('#handleUpdateUser', () => {

   describe('should not update the user', () => {
     describe('when the user id is invalid and not exist in db', () => {
       test('return success false', async () => {
        const userId = '623dbcc28210ea65a44d4f94'
        const response = await supertest(app)
          .put(`/api/user/${userId}`)
          .send({
              name: 'Ali Hamza',
              email: 'hamza@gmail.com',
              password: '123456789',
            })
          .expect(404);
           expect(response.body.message).toBe('User not found');
       })
     })
   })

   describe('when the email is invalid', () => {
     test('return true success', async () => {
       const userId = '623dbddec383e72e44bfe68e'
        const response = await supertest(app)
          .put(`/api/user/${userId}`)
          .send({
              name: 'Ali Hamza',
              email: 'hamzagmail.com',
              password: '123456789',
            })
          .expect(400);
           expect(response.body.message).toBe('Email is  invalid');

     })
   })

   describe('when the password length is less then 8', () => {
     test('return true success', async () => {
       const userId = '623dbddec383e72e44bfe68e'
        const response = await supertest(app)
          .put(`/api/user/${userId}`)
          .send({
              name: 'Ali Hamza',
              email: 'hamza@gmail.com',
              password: '1234567',
            })
          .expect(400);
           expect(response.body.message).toBe('Password must be at least 8 characters long');

     })
   })

   describe('should upadte the user', () => {
     describe('when the user id is valid and exist in the db', () => {
       test('return success true', async () => {
        const userId = '623dbddec383e72e44bfe68e'
        const response = await supertest(app)
          .put(`/api/user/${userId}`)
          .send({
              name: 'Ali Hamza',
              email: 'ali1@gmail.com',
              password: '123456789',
            })
          .expect(201);
           expect(response.body.message).toBe('User updated successfully');
       })
     })
   })
 })
