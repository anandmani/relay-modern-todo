import passport from 'passport'

export default function (app, db) {

  app.post('/login',
    passport.authenticate('local'),
    function (req, res, next) {
      console.log("after auth", req.session)
      next()
    },
    function (req, res) {
      res.send(req.user)
    }
  )

}


