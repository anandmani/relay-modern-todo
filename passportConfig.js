import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt-nodejs'
import { ObjectID } from 'mongodb'

// function generateHash(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

function verifyPassword(password, existingPassword) {
  return bcrypt.compareSync(password, existingPassword)
}

export default function (passport, db) {

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function (id, done) {
    db.collection('users').findOne({ _id: new ObjectID(id) })
      .then((user) => {
        done(null, user)
      })
      .catch(err => {
        console.error(err)
        done(err)
      })
  })

  passport.use(new LocalStrategy(
    function (username, password, done) {
      db.collection('users').findOne({ username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!verifyPassword(password, user.password)) { return done(null, false); }
        return done(null, user);
      })
    }
  ))

}