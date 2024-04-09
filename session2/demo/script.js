var emails = [
    {
        id: 0,
        from: "doner.deluxe@email.com",
        subject: "Ett fråga kring vad som händer",
        body: "<h3>Hej, jag funderar på en sak. :D</h3> Vad är det som händer med nya kebabhaket egentligen?",
        date: "2024-02-23 08:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 1,
        from: "spam.spamsson@spam.com",
        subject: "Guldklockor och godis",
        body: "Hej, vill du ha rättika och sånt?",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 2
    }, {
        id: 2,
        from: "gustaf@kebab.nu",
        subject: "Kebab och sånt",
        body: "Hej, vill du ha rättika och sånt på din tallrik?",
        date: "2024-31-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 3,
        from: "kebab.spammare@spam.com",
        subject: "Lunch nästa vecka?",
        body: "Hej, vill du ha godis och sånt?",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 4,
        from: "gustaf@kebab.nu",
        subject: "Kebab eller?",
        body: "Hej, vill du ha godis och sånt?",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 5,
        from: "admin@kebab.nu",
        subject: "Bekräfta ditt konto",
        body: "Hej, vill du ha godis och sånt?",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 6,
        from: "ekonomi@kebab.nu",
        subject: "Faktura: Order 123456",
        body: "Hej! 50 kr tack.",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [
            {
                fileName: 'faktura-123456.pdf',
                content: '',
                type: 'application/pdf',
                size: '142 kb'
            }
        ],
        type: 1
    }, {
        id: 7,
        from: "info@kebab.nu",
        subject: "Nyhet - Kebabsoppa!",
        body: "Hej! 50 kr tack.",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 8,
        from: "foto@kebab.nu",
        subject: "Kolla den här!",
        body: "<img src='https://i0.wp.com/www.jennysmatblogg.nu/app/uploads/sites/6/2013/01/IMG_59821.jpg' />",
        date: "2024-02-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 1
    }, {
        id: 9,
        from: "mattias.norell@consid.se",
        subject: "Beställning med utkörning",
        body: "Hej, jag skulle vilja beställa 6 familjepizzor till vårt kontor. Tack tack.",
        date: "2024-01-23 07:14",
        cc: [],
        isRead: false,
        attachements: [],
        type: 3
    }
];

/*
Funktioner som hanterar onclick-eventen som satts i index.html
Personligen hade jag inte gjort såhär men för pedagogikens skull får det vara med
*/
function handleEmailComposerOpen() {
    var emailComposeWrapper = document.querySelector('.email-compose');
    emailComposeWrapper.classList.add('open');
}

function handleEmailComposerClose() {
    var emailComposeWrapper = document.querySelector('.email-compose');
    emailComposeWrapper.classList.remove('open');
}

(function () {

    var inboxFolderItems = document.querySelectorAll('.inbox-folders__item');
    var emailDelete = document.querySelector('#email-delete');

    var inboxItemWrapper = document.querySelector('.inbox-items');
    var emailContentSubject = document.querySelector('#email-content-subject');
    var emailContentFrom = document.querySelector('#email-content-from');
    var emailContentDate = document.querySelector('#email-content-date');
    var emailContentBody = document.querySelector('#email-content-body');
    var emailContentAttatchements = document.querySelector('#email-content-attachements');

    var inboxTotalCount = document.querySelector('#inbox-folders-total-count');
    var inboxUnreadCount = document.querySelector('#inbox-folders-unread-count');
    var inboxSpamCount = document.querySelector('#inbox-folders-spam-count');
    var inboxSentCount = document.querySelector('#inbox-folders-sent-count');

    var emailComposeWrapper = document.querySelector('.email-compose');
    var searchField = document.getElementById('inbox-search');
    var emailComposeForm = document.getElementById('email-compose-form');

    // Variablerna nedan är en del av vår "fattigmans"-filtrering av mailen
    var activeEmailId = 0;
    var filterQuery = "";
    var activeFolder = 1;
    var onlyShowUnread = false;

    function loadEmail(index) {
        // Find loopar igenom en array och returnerar det första object den hittar som matchar
        var email = emails.find(email => email.id === index);

        activeEmailId = email.id;

        emailContentSubject.innerText = email.subject;
        emailContentFrom.innerText = email.from;
        emailContentBody.innerHTML = email.body; // innerHTML ska användas med försiktighet då det öppnar upp för script-injection
        emailContentDate.innerText = email.date;
        emailContentAttatchements.innerText = '';

        if (email.attachements && email.attachements.length > 0) {
            email.attachements.forEach(attachment => {
                var attachmentElement = document.createElement('div');
                attachmentElement.classList.add('attachment');

                var attachmentLink = document.createElement('a');
                attachmentLink.innerText = attachment.fileName;
                attachmentLink.setAttribute("href", attachment.fileName);
                attachmentLink.setAttribute("download", "download");

                attachmentElement.appendChild(attachmentLink);
                emailContentAttatchements.appendChild(attachmentElement);
            })
        }

        email.isRead = true;

        emails[index] = email;

        filterInbox();
    }

    function updateItemCount() {
        inboxTotalCount.innerText = emails.filter(email => email.type === 1).length;
        inboxUnreadCount.innerText = emails.filter(email => !email.isRead && email.type === 1).length;
        inboxSpamCount.innerText = emails.filter(email => email.type === 2).length;
        inboxSentCount.innerText = emails.filter(email => email.type === 3).length;
    }

    function filterInbox() {
        var emailsToRender = emails;

        if (filterQuery && filterQuery.length > 0) {
            emailsToRender = emailsToRender.filter(email => email.subject.toLocaleLowerCase().includes(filterQuery));
        }

        if (onlyShowUnread) {
            emailsToRender = emailsToRender.filter(email => email.type === activeFolder && !email.isRead);
        } else {
            emailsToRender = emailsToRender.filter(email => email.type === activeFolder);
        }

        var sortedEmails = emailsToRender.sort(function (a, b) { return new Date(b.date) - new Date(a.date) });

        renderInbox(sortedEmails);

        updateItemCount();
    }

    function renderInbox(emailsToRender) {
        inboxItemWrapper.innerHTML = '';

        if (emailsToRender.length === 0) {
            var folderItem = document.createElement('div');
            folderItem.classList.add('inbox-item__empty');
            folderItem.innerText = "Allt läst!"
            inboxItemWrapper.appendChild(folderItem);
            return;
        }

        emailsToRender.forEach(email => {
            var folderItem = document.createElement('div');
            folderItem.classList.add('inbox-item');

            if (email.isRead) {
                folderItem.classList.add('is-read');
            }

            if (email.isSpam) {
                folderItem.classList.add('is-spam');
            }

            if (email.id === activeEmailId) {
                folderItem.classList.add('is-active');
            }

            var folderItemSubject = document.createElement('div');
            folderItemSubject.classList.add('inbox-item__subject');

            var folderItemFrom = document.createElement('div');
            folderItemFrom.classList.add('inbox-item__from');

            folderItemSubject.innerText = email.subject;
            folderItem.appendChild(folderItemSubject);

            folderItemFrom.innerText = email.from;
            folderItem.appendChild(folderItemFrom);

            folderItem.addEventListener("click", function () {
                loadEmail(email.id)
            });

            inboxItemWrapper.appendChild(folderItem);
        });
    }

    function handleOnEmailSubmit(e) {
        e.preventDefault();

        var data = new FormData(e.target);
        var newEmail = {
            id: emails.length,
            from: data.get("emailFrom"),
            subject: data.get("emailSubject"),
            body: data.get("emailBody"),
            date: new Date().toLocaleString(),
            cc: [],
            isRead: false,
            attachements: [],
            type: 3
        }

        var attachement = data.get('emailAttachment');
        if (attachement) {
            newEmail.attachements.push({
                fileName: attachement.name,
                type: attachement.type,
                size: attachement.size,
            })
        }

        // Lägg till det nya mailet i vår 
        emails.push(newEmail);

        // Nollställ formuläret
        e.target.reset();

        emailComposeWrapper.classList.remove('open');

        filterInbox();
    };

    function handleOnSearchInput(e) {
        filterQuery = e.target.value;
        filterInbox();
    };

    function handleOnFolderSelect(e) {
        activeFolder = parseInt(e.currentTarget.getAttribute("data-folder-id"));
        onlyShowUnread = e.currentTarget.hasAttribute("data-only-show-unread");
        filterInbox();
    }
   
    // Sätt upp event för sökfältet
    searchField.addEventListener('input', handleOnSearchInput);

    // Sätt upp event för att göra mapparna klickbara
    inboxFolderItems.forEach(item => item.addEventListener('click', handleOnFolderSelect));

    // Sätt upp event som hanterar skickning av nya mail
    emailComposeForm.addEventListener('submit', handleOnEmailSubmit);
    
    // Ladda första mailet vid start
    loadEmail(emails[0].id);

})();