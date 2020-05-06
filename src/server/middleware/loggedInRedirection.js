


exports.ifNotLoggedIn = function(redirectionPath) {

    return (req, res, next) => {

        if (!res.locals || !res.locals.user)
            res.redirect(redirectionPath)

        else next()
    }

}

exports.ifLoggedIn = function(redirectionPath) {

    return (req, res, next) => {

        if (res.locals && res.locals.user)
            res.redirect(redirectionPath)

        else next()

    }

}