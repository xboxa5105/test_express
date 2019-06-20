module.exports = {
    req: function (req, res) {
        const query = JSON.stringify(req.query)
        const params = JSON.stringify(req.params)
        const body = JSON.stringify(req.body)
        const headers = JSON.stringify(req.headers)
        return `query : ${query} params : ${params} body : ${body} headers : ${headers}`
    },
    developmentFormatLine: function developmentFormatLine(tokens, req, res) {
        function headersSent(res) {
            return typeof res.headersSent !== 'boolean'
                ? Boolean(res._header)
                : res.headersSent
        }
        function compile(format) {
            if (typeof format !== 'string') {
                throw new TypeError('argument format must be a string')
            }

            var fmt = format.replace(/"/g, '\\"')
            var js = '  "use strict"\n  return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
                var tokenArguments = 'req, res'
                var tokenFunction = 'tokens[' + String(JSON.stringify(name)) + ']'

                if (arg !== undefined) {
                    tokenArguments += ', ' + String(JSON.stringify(arg))
                }

                return '" +\n    (' + tokenFunction + '(' + tokenArguments + ') || "-") + "'
            }) + '"'

            // eslint-disable-next-line no-new-func
            return new Function('tokens, req, res', js)
        }
        // get the status code if response written
        var status = headersSent(res)
            ? res.statusCode
            : undefined

        // get status color
        var color = status >= 500 ? 31 // red
            : status >= 400 ? 33 // yellow
                : status >= 300 ? 36 // cyan
                    : status >= 200 ? 32 // green
                        : 0 // no color

        // get colored function
        var fn = developmentFormatLine[color]
        // const req1 = CircularJSON.stringify(req)
        if (!fn) {
            // compile
            fn = developmentFormatLine[color] = compile('\x1b[0m[:date[iso]] \x1b[0m:method \x1b[' +
                color + 'm:status \x1b[0m:url \x1b[0m{req : :req} - \x1b[0m:response-time ms {:referrer - :user-agent - HTTP/:http-version - :remote-addr - :req[header] - :res[header]}')
        }

        return fn(tokens, req, res)
    }
}