document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav');

    if (menuToggle && navMenu) {
        const closeMenu = () => {
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
            const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const statusElement = document.getElementById('contact-form-status');
        const accessKeyInput = document.getElementById('web3forms-access-key');

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const accessKey = accessKeyInput?.value.trim();
            if (!accessKey || accessKey === 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY') {
                setContactFormStatus(
                    statusElement,
                    currentLanguage() === 'uk'
                        ? 'Форму ще не налаштовано. Додайте ключ доступу Web3Forms, щоб отримувати повідомлення.'
                        : 'This form is not configured yet. Add the Web3Forms access key to start receiving messages.',
                    'error'
                );
                return;
            }

            const formData = new FormData(contactForm);
            const payload = Object.fromEntries(formData.entries());

            if (!payload.subject) {
                payload.subject = currentLanguage() === 'uk'
                    ? 'Нове повідомлення з сайту UCSS Edmonton'
                    : 'New message from the UCSS Edmonton website';
            }

            setContactFormStatus(
                statusElement,
                currentLanguage() === 'uk' ? 'Надсилаємо повідомлення...' : 'Sending your message...',
                null
            );
            if (submitButton) submitButton.disabled = true;

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    setContactFormStatus(
                        statusElement,
                        currentLanguage() === 'uk'
                            ? 'Дякуємо. Ваше повідомлення надіслано.'
                            : 'Thank you. Your message has been sent.',
                        'success'
                    );
                    contactForm.reset();
                } else {
                    setContactFormStatus(
                        statusElement,
                        result.message || (currentLanguage() === 'uk'
                            ? 'Не вдалося надіслати повідомлення. Спробуйте ще раз пізніше.'
                            : 'We could not send your message. Please try again later.'),
                        'error'
                    );
                }
            } catch (error) {
                console.error('Contact form submission failed:', error);
                setContactFormStatus(
                    statusElement,
                    currentLanguage() === 'uk'
                        ? 'Сталася помилка мережі. Спробуйте ще раз пізніше.'
                        : 'A network error occurred. Please try again later.',
                    'error'
                );
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

    initTabs();
    initLanguageSwitch();
});

const translationsUk = {
    'Home - Ukrainian Canadian Social Services - Edmonton': 'Головна - Ukrainian Canadian Social Services - Edmonton',
    'About - Ukrainian Canadian Social Services - Edmonton': 'Про нас - Ukrainian Canadian Social Services - Edmonton',
    'Services - Ukrainian Canadian Social Services - Edmonton': 'Послуги - Ukrainian Canadian Social Services - Edmonton',
    'Useful Info - Ukrainian Canadian Social Services - Edmonton': 'Корисна інформація - Ukrainian Canadian Social Services - Edmonton',
    'Donations - Ukrainian Canadian Social Services - Edmonton': 'Пожертви - Ukrainian Canadian Social Services - Edmonton',
    "Let's get connected on Facebook too": 'Долучайтеся до нас також у Facebook',
    'UCSS Edmonton': 'UCSS Edmonton',
    'Home': 'Головна',
    'About': 'Про нас',
    'Services': 'Послуги',
    'Useful Info': 'Корисна інформація',
    'Useful information for community members and newcomers.': 'Корисна інформація для членів громади та новоприбулих.',
    'Translated reference information from the provided document': 'Перекладена довідкова інформація з наданого документа',
    'Contact Us': 'Контакти',
    'Donations': 'Пожертви',
    'Ukrainian Canadian Social Services - Edmonton': 'Ukrainian Canadian Social Services - Edmonton',
    'Supporting our community together': 'Разом підтримуємо нашу громаду',
    'UCSS is a non-profit charitable organization dedicated to helping people who need support. It responds to the needs and interests of the Ukrainian community and individuals by providing a wide range of programs and services.': 'Суспільна Служба Українців Канади присвячує свою діяльність підтримці осіб, які потребують допомоги. Як неприбуткова благодійна організація, Служба реагує на потреби та інтереси української громади й окремих осіб, надаючи широкий спектр програм, послуг і ресурсів.',
    'Make a Donation': 'Зробити пожертву',
    'Learn how we can help': 'Дізнатися, як ми можемо допомогти',
    'Learn more about': 'Дізнайтеся більше про',
    'History, services, volunteering, and community support': 'Історія, послуги, волонтерство та підтримка громади',
    'Explore UCSS Edmonton through dedicated pages for About, Services, and Donations': 'Ознайомтеся з діяльністю UCSS Edmonton на окремих сторінках «Про нас», «Послуги» та «Пожертви»',
    'Our history': 'Наша історія',
    'How UCSS Edmonton became part of the community': 'Як UCSS Edmonton стала частиною громади',
    'Our board': 'Наша управа',
    'Names and positions from the current Board page': 'Імена та посади чинного складу управи',
    'Membership & Volunteering': 'Членство та волонтерство',
    'Equity Statement': 'Заява про рівність',
    'Become a member or volunteer your time': 'Станьте членом організації або долучіться як волонтер',
    'Settlement, community, and immigration services': 'Послуги з облаштування, підтримки громади та імміграційні послуги',
    'Community care': 'Турбота про громаду',
    'Practical support for newcomers, seniors, families, and people in need': 'Практична підтримка для новоприбулих, людей старшого віку, сімей і всіх, хто потребує допомоги',
    'UCSS Edmonton connects people with settlement guidance, immigration information, translation help, community referrals, and support for vulnerable community members': 'UCSS Edmonton допомагає людям отримати поради щодо облаштування, інформацію з питань імміграції, перекладацьку допомогу, скерування до громадських ресурсів і підтримку для вразливих членів громади',
    'Our services are grounded in Ukrainian community values while remaining open and welcoming to those who need assistance': 'Наші послуги ґрунтуються на цінностях української громади й водночас залишаються відкритими та доброзичливими до всіх, хто потребує допомоги',
    'View Services': 'Переглянути послуги',
    'What UCSS helps with': 'У чому допомагає UCSS',
    'Clear next steps when life in a new place feels complicated': 'Зрозумілі наступні кроки, коли життя на новому місці здається складним',
    'Newcomer connection': 'Підтримка новоприбулих',
    'Meet-and-greet events and settlement referrals help newcomers find community and services': 'Зустрічі-знайомства та скерування до служб підтримки допомагають новоприбулим знайти громаду й потрібні послуги',
    'Information access': 'Доступ до інформації',
    'UCSS shares timely support information and helps community members find the right programs': 'UCSS поширює актуальну інформацію про підтримку та допомагає членам громади знайти відповідні програми',
    'Volunteer support': 'Волонтерська підтримка',
    'Volunteers, donors, and members make daily service work possible': 'Саме волонтери, донори та члени організації роблять цю щоденну роботу можливою',
    'Our address': 'Наша адреса',
    'Feel free to contact us if you have questions or suggestions': 'Звертайтеся до нас, якщо маєте запитання або пропозиції',
    'Note:': 'Примітка:',
    'All visits should be by appointment.': 'Усі візити мають відбуватися за попереднім записом.',
    'Address': 'Адреса',
    'Phone': 'Телефон',
    'Fax': 'Факс',
    'Email': 'Електронна пошта',
    'Hours of Operation': 'Години роботи',
    'Monday - Friday: 9:00 AM - 4:30 PM': 'Понеділок - пʼятниця: 9:00 - 16:30',
    'Send us a message': 'Надішліть нам повідомлення',
    'Name': 'Імʼя',
    'Subject': 'Тема',
    'Message': 'Повідомлення',
    'Send Message': 'Надіслати повідомлення',
    'Registered Charity / Foundation': 'Зареєстрована благодійна організація / фундація',
    '© 2026 Ukrainian Canadian Social Services - Edmonton. All rights reserved.': '© 2026 Ukrainian Canadian Social Services - Edmonton. Усі права захищено.',
    'About Us': 'Про нас',
    'About our organization': 'Про нашу організацію',
    'History, Board of Directors, Membership & Volunteering, and Equity Statement information for Ukrainian Canadian Social Services - Edmonton': 'Інформація про історію, склад управи, членство, волонтерство та заяву про рівність Ukrainian Canadian Social Services - Edmonton',
    'History': 'Історія',
    'Board of Directors': 'Управа',
    'Established by the community, working for the community': 'Створено громадою для громади - з турботою з 1977 року',
    "The Ukrainian community has long been part of Canada's multicultural society. As community needs changed, Ukrainian organizations recognized the need for a social service organization focused on practical support.": 'Українська громада вже давно є частиною багатокультурного суспільства Канади. Із зміною потреб громади українські організації усвідомили потребу в соціальній службі, зосередженій на практичній підтримці.',
    'UCSS traces its roots to the Ukrainian Canadian Relief Fund, founded in 1945 to help post-war refugees. Ukrainian Canadian Social Services later grew nationally, and the Edmonton branch was incorporated on October 14, 1977.': 'UCSS бере свій початок від Ukrainian Canadian Relief Fund, заснованого 1945 року для допомоги повоєнним біженцям. Згодом Ukrainian Canadian Social Services розвинулася на національному рівні, а відділення в Едмонтоні було зареєстроване 14 жовтня 1977 року.',
    'Since then, UCSS Edmonton has provided social services to new immigrants, seniors, and others requiring help. The office has moved over the years and is now located at 11717 - 97 Street.': 'Відтоді UCSS Edmonton надає соціальні послуги новим іммігрантам, людям старшого віку та іншим, хто потребує допомоги. За ці роки офіс кілька разів змінював місце розташування і нині працює за адресою 11717 - 97 Street.',
    'UCSS has supported waves of newcomers, sponsored families, assisted refugees, and adapted its immigration, settlement, senior, pension, benefit, disability, and community support services as needs evolved.': 'UCSS підтримувала нові хвилі прибулих, спонсорувала сім’ї, допомагала біженцям і змінювала свої послуги у сферах імміграції, облаштування, підтримки людей старшого віку, пенсій, пільг, інвалідності та громади відповідно до потреб.',
    'Community fundraising, grants, bingos, casinos, donors, volunteers, and board members continue to support the daily work of the organization.': 'Громадські збірки коштів, гранти, бінго, казино, донори, волонтери та члени Управи продовжують підтримувати щоденну працю організації.',
    'UCSS - Edmonton Board of Directors 2026-2027': 'Склад Управи UCSS - Edmonton на 2026-2027 роки',
    'Honorary Members': 'Почесні члени',
    'Honorary Member': 'Почесний член',
    'His Eminence Metropolitan Ilarion': 'Його Високопреосвященство Митрополит Іларіон',
    'His Excellency Bishop David Motiuk': 'Його Преосвященство Єпископ Давид Мотюк',
    'Officers of the board': 'Посадові особи Управи',
    'President': 'Президент',
    'Past President': 'Попередній президент',
    '1st Vice President': 'Перший віцепрезидент',
    '2nd Vice President': 'Другий віцепрезидент',
    'Secretary': 'Секретар',
    'Treasurer': 'Скарбник',
    'Directors': 'Директори',
    'Membership': 'Членство',
    'UCSS Edmonton invites you to become a member, participate in programs, or volunteer your time to help others': 'UCSS Edmonton запрошує вас стати членом організації, брати участь у програмах або присвятити свій час допомозі іншим',
    'Download and complete the membership form.': 'Завантажте та заповніть форму членства.',
    'Bring in or mail the application with membership fee to UCSS Edmonton.': 'Принесіть або надішліть заяву разом із членським внеском до UCSS Edmonton.',
    'Contact the office at 780-471-4477 or ucss@shaw.ca for more information.': 'Для додаткової інформації звертайтеся до офісу за телефоном 780-471-4477 або електронною поштою ucss@shaw.ca.',
    'Download Membership Form': 'Завантажити форму членства',
    'Volunteering': 'Волонтерство',
    'Daily operations are possible thanks to benefactors and volunteers. UCSS welcomes people who can offer time to support the agency and community members in need': 'Щоденна робота можлива завдяки благодійникам і волонтерам. UCSS радо запрошує людей, які готові присвятити свій час підтримці організації та членів громади, які цього потребують',
    'Download and complete the volunteer form.': 'Завантажте та заповніть волонтерську форму.',
    'Bring in or mail the completed application to 11717 - 97th Street.': 'Принесіть або надішліть заповнену заяву на адресу 11717 - 97th Street.',
    'For fundraising events, call (780) 471-4477.': 'Щодо допомоги з фандрейзинговими подіями телефонуйте (780) 471-4477.',
    'Download Volunteer Form': 'Завантажити волонтерську форму',
    "UCSS Edmonton's Equity Statement is available from the original website in English and Ukrainian": 'Заява про рівність UCSS Edmonton доступна англійською та українською мовами',
    'English PDF': 'Англійський PDF',
    'Ukrainian PDF': 'Український PDF',
    'How we serve our community': 'Як ми служимо нашій громаді',
    'Settlement, community, and immigration services': 'Послуги з облаштування, підтримки громади та імміграції',
    'Settlement Services': 'Послуги з облаштування',
    'UCSS provides guidance and advice for newcomers settling in Edmonton and Alberta': 'UCSS надає поради та супровід новоприбулим, які облаштовуються в Едмонтоні та Альберті',
    'Finding rental residences or learning how to purchase real estate': 'Пошук орендованого житла або інформація про купівлю нерухомості',
    'Job searches': 'Пошук роботи',
    'Applying for SIN and the Alberta Health Care Plan': 'Оформлення SIN та реєстрація в системі медичного страхування Альберти',
    'Educational services including ESL and post-secondary options': 'Освітні послуги, включно з ESL та варіантами післясередньої освіти',
    'School registration for children': 'Реєстрація дітей до школи',
    'Cooperation with the Consulate General of Ukraine in Edmonton': 'Співпраця з Consulate General of Ukraine in Edmonton',
    'Cooperation with Ukrainian Catholic and Orthodox churches': 'Співпраця з Українською Католицькою та Православною Церквами',
    'Useful Links': 'Корисні посилання',
    'Houses for sale': 'Житло на продаж',
    'Houses for rent': 'Житло в оренду',
    'Jobs': 'Робота',
    'SIN Card application': 'Заява на отримання SIN',
    'Alberta Health Care Card': 'Картка медичного страхування Альберти',
    'Community Services': 'Громадські послуги',
    'UCSS assists seniors, families, women, youth, the sick, and those in need with social support information and referrals': 'UCSS надає людям старшого віку, сім’ям, жінкам, молоді, хворим і всім, хто опинився в скруті, інформацію про соціальну підтримку та скерування до відповідних служб',
    'Information about social services': 'Інформація про соціальні послуги',
    'Information for seniors about welfare programs': 'Інформація для старших людей про програми соціальної допомоги',
    'Information on family benefit programs including Canada Child Benefit and Alberta Child and Family Benefit': 'Інформація про програми підтримки сімей, зокрема Canada Child Benefit та Alberta Child and Family Benefit',
    'Information about unemployment assistance and Employment Insurance': 'Інформація про допомогу у зв’язку з безробіттям та Employment Insurance',
    'Translation services': 'Перекладацькі послуги',
    'Information about public and government organizations': 'Інформація про громадські та державні організації',
    'Edmonton property taxes': 'Податки на нерухомість в Едмонтоні',
    'Immigration Services': 'Імміграційні послуги',
    'UCSS provides general information and referral support for immigration questions': 'UCSS надає загальну інформацію та скерування щодо імміграційних питань',
    'General information about immigration regulations': 'Загальна інформація про імміграційні правила',
    'Information on immigration procedures and government information': 'Інформація про імміграційні процедури та державні ресурси',
    'Referrals to immigration specialists and lawyers': 'Скерування до імміграційних спеціалістів та юристів',
    'Programs': 'Програми',
    'Transit Access Grant Program': 'Програма Transit Access Grant',
    'UCSS Edmonton supports community members by providing public transit tickets to eligible individuals and families, when available. Assistance depends on program funding and available resources.': 'UCSS Edmonton підтримує членів громади, надаючи проїзні квитки на громадський транспорт особам і сім’ям, які відповідають критеріям програми, за наявності квитків. Надання допомоги залежить від фінансування та ресурсів програми.',
    'Food Card Program': 'Програма Food Card',
    'UCSS Edmonton supports individuals and families in need by providing grocery gift cards when available. Availability depends on funding and organizational resources.': 'UCSS Edmonton підтримує осіб і сім’ї, які потребують допомоги, надаючи подарункові картки на продукти харчування за наявності. Доступність програми залежить від фінансування та ресурсів організації.',
    'To find out whether support is currently available or if the program is open, please contact us by phone or email.': 'Щоб дізнатися, чи наразі доступна допомога або чи відкрита програма, будь ласка, зв’яжіться з нами телефоном або електронною поштою.',
    'Official Canada Immigration website': 'Офіційний сайт імміграції Канади',
    'Other Useful Links': 'Інші корисні посилання',
    'These links connect community members to housing, employment, education, health, immigration, seniors, family, and community resources': 'Ці посилання допомагають членам громади знайти ресурси щодо житла, працевлаштування, освіти, здоров’я, імміграції, підтримки людей старшого віку, сім’ї та громади',
    'Language Instruction for Newcomers': 'Мовне навчання для новоприбулих',
    'Find a daycare': 'Знайти дитячий садок',
    'Norwood Child and Family Resource Centre': 'Ресурсний центр Norwood для дітей і сімей',
    'Ukrainian daycares': 'Українські дитячі садки',
    'Ukrainian Catholic Church': 'Ukrainian Catholic Church',
    'Ukrainian Orthodox Church': 'Ukrainian Orthodox Church',
    'Old Age Security': 'Old Age Security',
    'Housing for seniors': 'Житло для старших людей',
    'Canada Child Benefit': 'Canada Child Benefit',
    'Employment Insurance': 'Employment Insurance',
    'Action for Healthy Communities': 'Action for Healthy Communities',
    'Ukrainian Canadian Congress - Alberta': 'Ukrainian Canadian Congress - Alberta',
    'Volunteer support': 'Волонтерська підтримка',
    'Dear Community Members!': 'Шановні члени громади!',
    'Your support enables UCSS Edmonton to continue providing free community services locally and abroad': 'Ваша підтримка дає змогу UCSS Edmonton і надалі надавати безкоштовні громадські послуги на місцевому рівні та за кордоном',
    'Your generosity enables UCSS Edmonton to continue providing free support, services, and programs to those who need them most in Edmonton and the surrounding area.': 'Ваша щедрість дає змогу UCSS Edmonton і надалі надавати безкоштовну підтримку, послуги та програми тим, хто найбільше цього потребує в Едмонтоні та прилеглих громадах.',
    '1. By cheque to:': '1. Чеком на адресу:',
    'Payable to:': 'Виписати на:',
    '2. By Interac e-transfer:': '2. Переказом Interac e-transfer:',
    'Make your donation to:': 'Надішліть пожертву на:',
    'Please include your full name and address, and advise whether you wish to receive a tax receipt. Follow with an email to': 'Будь ласка, вкажіть своє повне імʼя та адресу, а також повідомте, чи бажаєте отримати податкову квитанцію. Після цього надішліть лист на',
    'Every Fall Ukrainian Canadian Social Services - Edmonton turns to the community with a request to support its annual fundraising campaign. UCSS activity is guided by the needs of our community in Canada and throughout the world.': 'Щоосені Ukrainian Canadian Social Services - Edmonton звертається до громади з проханням підтримати щорічну кампанію зі збору коштів. Діяльність UCSS визначається потребами нашої громади в Канаді та в усьому світі.',
    'UCSS helps new immigrants, elderly, sick and isolated community members, and victims of natural disasters and catastrophes. Services are free of charge and open to community members.': 'UCSS допомагає новим іммігрантам, людям старшого віку, хворим та ізольованим членам громади, а також постраждалим від стихійних лих і катастроф. Послуги є безкоштовними та доступними для членів громади.',
    'Daily operations rely on the goodwill of those who understand the need for services that support vulnerable members of our community here in Canada and abroad.': 'Щоденна робота тримається на добрій волі тих, хто розуміє важливість послуг для вразливих членів нашої громади тут, у Канаді, та за її межами.',
    'Support UCSS': 'Підтримати UCSS',
    'Help us continue serving the community': 'Допоможіть нам і надалі служити громаді',
    'Choose the donation method that works best for you and support free programs and services in Edmonton and the surrounding area.': 'Оберіть зручний для вас спосіб пожертви та підтримайте безкоштовні програми й послуги в Едмонтоні та прилеглих громадах.',
    'Every fall, Ukrainian Canadian Social Services – Edmonton turns to the community for support through its annual fundraising campaign. UCSS activities are guided by the needs of our community in Edmonton and the surrounding area.': 'Щоосені Ukrainian Canadian Social Services – Edmonton звертається до громади по підтримку в межах щорічної кампанії зі збору коштів. Діяльність UCSS визначається потребами нашої громади в Едмонтоні та прилеглих громадах.',
    'UCSS helps newcomers, seniors, and community members facing difficulties or hardship. Our services are free of charge and available to those who need them.': 'UCSS допомагає новоприбулим, людям старшого віку та членам громади, які опинилися в складних життєвих обставинах. Наші послуги є безкоштовними та доступними для тих, хто їх потребує.',
    'Our daily operations rely on the generosity of individuals who understand the importance of providing support and services to vulnerable members of our community in Edmonton and the surrounding area. Your contribution helps us continue making a meaningful difference in the lives of those we serve.': 'Наша щоденна діяльність ґрунтується на щедрості людей, які розуміють важливість надання підтримки та послуг вразливим членам нашої громади в Едмонтоні та прилеглих громадах. Ваш внесок допомагає нам і надалі відчутно змінювати життя тих, кому ми служимо.',
    'Get Support': 'Отримати підтримку',
    'Request organizational support from UCSS': 'Подати запит на організаційну підтримку від UCSS',
    'Local Ukrainian and community organizations can submit a request for assistance using the form below.': 'Місцеві українські та громадські організації можуть подати запит на допомогу за допомогою наведеної нижче форми.',
    'Community Organization Support': 'Підтримка громадських організацій',
    'UCSS Edmonton is committed to supporting local Ukrainian and community organizations that contribute to the well-being and growth of our community. If your organization is seeking assistance, please complete the request form below.': 'UCSS Edmonton підтримує місцеві українські та громадські організації, які сприяють добробуту й розвитку нашої громади. Якщо ваша організація потребує допомоги, будь ласка, заповніть форму запиту нижче.',
    'Requests are reviewed on a case-by-case basis and are subject to available resources and organizational priorities.': 'Кожен запит розглядається в індивідуальному порядку з урахуванням наявних ресурсів та організаційних пріоритетів.',
    'For all donations $10 and more income tax receipts will be issued': 'На всі пожертви від 10 доларів і більше видаються податкові квитанції',
    'Thank you for your donations!': 'Дякуємо за ваші пожертви!',
    'Funding Request Form': 'Форма запиту на фінансування'
};

function currentLanguage() {
    return localStorage.getItem('ucss-language') || 'en';
}

function setContactFormStatus(element, message, tone) {
    if (!element) return;
    element.textContent = message;
    element.classList.remove('is-success', 'is-error');
    if (tone === 'success') element.classList.add('is-success');
    if (tone === 'error') element.classList.add('is-error');
}

function preserveSpacing(original, translated) {
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    return `${leading}${translated}${trailing}`;
}

function translatePage(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || parent.closest('script, style, .material-symbols-outlined')) return NodeFilter.FILTER_REJECT;
            const text = node.nodeValue.trim().replace(/\s+/g, ' ');
            return text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
        if (!node.__enText) node.__enText = node.nodeValue;
        const normalized = node.__enText.trim().replace(/\s+/g, ' ');
        if (lang === 'uk' && translationsUk[normalized]) {
            node.nodeValue = preserveSpacing(node.__enText, translationsUk[normalized]);
        } else {
            node.nodeValue = node.__enText;
        }
    });

    const originalTitle = document.documentElement.dataset.enTitle || document.title;
    document.documentElement.dataset.enTitle = originalTitle;
    document.title = lang === 'uk' && translationsUk[originalTitle] ? translationsUk[originalTitle] : originalTitle;
    document.documentElement.lang = lang === 'uk' ? 'uk' : 'en-CA';

    document.querySelectorAll('[data-lang-content]').forEach((element) => {
        element.hidden = element.dataset.langContent !== lang;
    });

    document.querySelectorAll('.language-switch button').forEach((button) => {
        const active = button.dataset.lang === lang;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
    });
}

function initLanguageSwitch() {
    const switcher = document.querySelector('.language-switch');
    if (!switcher) return;

    switcher.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang || 'en';
            localStorage.setItem('ucss-language', lang);
            translatePage(lang);
        });
    });

    translatePage(currentLanguage());
}

function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((tabRoot) => {
        const buttons = Array.from(tabRoot.querySelectorAll('[role="tab"]'));
        const panels = Array.from(tabRoot.querySelectorAll('[role="tabpanel"]'));
        if (!buttons.length || !panels.length) return;

        const activateTab = (buttonToActivate) => {
            const targetId = buttonToActivate.getAttribute('aria-controls');

            buttons.forEach((button) => {
                const isActive = button === buttonToActivate;
                button.setAttribute('aria-selected', String(isActive));
                button.tabIndex = isActive ? 0 : -1;
                button.classList.toggle('is-active', isActive);
            });

            panels.forEach((panel) => {
                panel.hidden = panel.id !== targetId;
            });
        };

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => activateTab(button));

            button.addEventListener('keydown', (event) => {
                let nextIndex = index;

                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % buttons.length;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + buttons.length) % buttons.length;
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = buttons.length - 1;

                if (nextIndex !== index) {
                    event.preventDefault();
                    buttons[nextIndex].focus();
                    activateTab(buttons[nextIndex]);
                }
            });
        });

        const preselected = buttons.find((button) => button.getAttribute('aria-selected') === 'true') || buttons[0];
        activateTab(preselected);
    });
}
