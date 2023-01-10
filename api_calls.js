const method = (method, context) => {
    const dict = {
    "GET":{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + context.req.cookies['access'],
        }
    },
    "POST": {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.req.cookies['access'],
            }
    },
    "PATCH": {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.req.cookies['access'],
            }
    },
    "DELETE": {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.req.cookies['access'],
            }
    }

    }
    return dict[method]
}

export async function get_campaigns_list(context) {

    if (context.req.cookies['access'] == '' || context.req.cookies['access'] == undefined || context.req.cookies['access'] == null) {
        return []
      }

    let req = await fetch('http://127.0.0.1:8000/campaigns/campaigns?workspace_id=' + context.params['wks_id'], method('GET', context))
    let res = await req.json()
    return res
}


export async function get_workspaces_list(context) {

    let current_wks = {}
    let workspaces = []
    if (context.req.cookies['access'] == '' || context.req.cookies['access'] == undefined || context.req.cookies['access'] == null) {
        return {workspaces, current_wks}
    }

    let req = await fetch('http://127.0.0.1:8000/users/workspaces', method('GET', context))
    workspaces = await req.json()

    
    for (let i=0; i<workspaces.length; i++) {
      if (workspaces[i].id == context.params['wks_id']) {
        current_wks = workspaces[i]
      }
    }
    return {workspaces, current_wks}
}

export async function get_emails_list(context) {
    let emails = []
    let page = 0
    let currentPage = 0
    let totalEmails = 0
    let totalPages = 0
    let url = ''

    if (context.req.cookies['access'] == '' || context.req.cookies['access'] == undefined || context.req.cookies['access'] == null) {
        return { emails, totalEmails, totalPages, currentPage }
    }

    if (!context.query.hasOwnProperty('p')) {
        page = 1
    }
    else {
        page = context.query['p']
    }

    currentPage = parseInt(page)
    
    url = 'http://127.0.0.1:8000/emails/emails?workspace_id=' + context.params['wks_id'] + '&p=' + page

    if (context.query.hasOwnProperty('s')) {
        url += '&search=' + context.query['s']
    }
    console.log(url)

    let req = await fetch(url, method('GET', context))
    let data = await req.json()
    emails = data.results
    totalEmails = data.count
    totalPages = Math.ceil(totalEmails / 10)

    return { emails, totalEmails, totalPages, currentPage }
}

