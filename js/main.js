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
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert(currentLanguage() === 'uk' ? 'Дякуємо за ваше повідомлення! Це демонстраційна форма.' : 'Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }

    initLanguageSwitch();
});

const translationsUk = {
    'Home - Ukrainian Canadian Social Services (Edmonton)': 'Головна - Суспільна служба українців Канади (Едмонтон)',
    'About - Ukrainian Canadian Social Services (Edmonton)': 'Про нас - Суспільна служба українців Канади (Едмонтон)',
    'Services - Ukrainian Canadian Social Services (Edmonton)': 'Послуги - Суспільна служба українців Канади (Едмонтон)',
    'Gallery - Ukrainian Canadian Social Services (Edmonton)': 'Галерея - Суспільна служба українців Канади (Едмонтон)',
    'Donations - Ukrainian Canadian Social Services (Edmonton)': 'Пожертви - Суспільна служба українців Канади (Едмонтон)',
    "Let's get connected on Facebook too": 'Долучайтеся до нас також у Facebook',
    'UCSS Edmonton': 'UCSS Edmonton',
    'Home': 'Головна',
    'About': 'Про нас',
    'Services': 'Послуги',
    'Gallery': 'Галерея',
    'Contact Us': 'Контакти',
    'Donations': 'Пожертви',
    'Ukrainian Canadian Social Services (Edmonton)': 'Суспільна служба українців Канади (Едмонтон)',
    'Supporting our community, together.': 'Підтримуємо нашу громаду разом.',
    'UCSS is dedicated to helping those who are unable to help themselves. As a non-profit charitable organization, UCSS responds to the needs and interests of the Ukrainian community and individuals through a wide range of services.': 'ССУК присвячена допомозі тим, хто не може допомогти собі самостійно. Як неприбуткова благодійна організація, ССУК відповідає на потреби й інтереси української громади та окремих людей через широкий спектр послуг.',
    'Make a Donation': 'Зробити пожертву',
    'Learn how we can help': 'Дізнатися, як ми можемо допомогти',
    'Learn more about': 'Дізнайтеся більше про',
    'History, services, volunteering, and community support.': 'Історію, послуги, волонтерство та підтримку громади.',
    'Explore UCSS Edmonton through dedicated pages for About, Services, Gallery, and Donations.': 'Ознайомтеся з діяльністю UCSS Edmonton на окремих сторінках Про нас, Послуги, Галерея та Пожертви.',
    'Our history': 'Наша історія',
    'How UCSS Edmonton became part of the community.': 'Як UCSS Edmonton стала частиною громади.',
    'Our board': 'Наша управа',
    'Names and positions from the current Board page.': 'Імена та посади з чинної сторінки Управи.',
    'Membership & Volunteering': 'Членство та волонтерство',
    'Become a member or volunteer your time.': 'Станьте членом організації або присвятіть свій час волонтерству.',
    'Settlement, community, and immigration services.': 'Послуги з поселення, громадської підтримки та імміграції.',
    'Community care': 'Турбота про громаду',
    'Practical support for newcomers, seniors, families, and people in need.': 'Практична підтримка для новоприбулих, старших людей, сімей та людей у потребі.',
    'UCSS Edmonton connects people with settlement guidance, immigration information, translation help, community referrals, and support for vulnerable community members.': 'UCSS Edmonton допомагає людям отримати поради щодо поселення, імміграційну інформацію, перекладацьку допомогу, скерування до громадських ресурсів і підтримку для вразливих членів громади.',
    'Our services are grounded in Ukrainian community values while remaining open and welcoming to those who need assistance.': 'Наші послуги ґрунтуються на цінностях української громади й водночас залишаються відкритими та привітними для всіх, хто потребує допомоги.',
    'View Services': 'Переглянути послуги',
    'What UCSS helps with': 'З чим допомагає ССУК',
    'Clear next steps when life in a new place feels complicated.': 'Зрозумілі наступні кроки, коли життя на новому місці здається складним.',
    'Newcomer connection': 'Підтримка новоприбулих',
    'Meet-and-greet events and settlement referrals help newcomers find community and services.': 'Зустрічі та скерування до послуг із поселення допомагають новоприбулим знайти громаду й потрібну підтримку.',
    'Information access': 'Доступ до інформації',
    'UCSS shares timely support information and helps community members find the right programs.': 'ССУК поширює актуальну інформацію про підтримку та допомагає членам громади знайти відповідні програми.',
    'Volunteer support': 'Волонтерська підтримка',
    'Volunteers, donors, and members make daily service work possible.': 'Волонтери, жертводавці та члени організації роблять щоденну працю служби можливою.',
    'Our address': 'Наша адреса',
    'Feel free to contact us if you have questions or suggestions.': 'Звертайтеся до нас, якщо маєте запитання або пропозиції.',
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
    '© 2026 Ukrainian Canadian Social Services (Edmonton). All rights reserved.': '© 2026 Суспільна служба українців Канади (Едмонтон). Усі права захищено.',
    'About Us': 'Про нас',
    'About our organization': 'Про нашу організацію',
    'History, Board of Directors, and Membership & Volunteering information for Ukrainian Canadian Social Services (Edmonton).': 'Інформація про історію, Управу, членство та волонтерство UCSS Edmonton.',
    'History': 'Історія',
    'Board of Directors': 'Управа',
    'Established by the community, working for the community.': 'Заснована громадою і працює для громади.',
    "The Ukrainian community has long been part of Canada's multicultural society. As community needs changed, Ukrainian organizations recognized the need for a social service organization focused on practical support.": 'Українська громада вже давно є частиною багатокультурного суспільства Канади. Коли потреби громади змінювалися, українські організації усвідомили потребу в соціальній службі, зосередженій на практичній підтримці.',
    'UCSS traces its roots to the Ukrainian Canadian Relief Fund, founded in 1945 to help post-war refugees. Ukrainian Canadian Social Services later grew nationally, and the Edmonton branch was incorporated on October 14, 1977.': 'ССУК бере свій початок від Українського канадського допомогового фонду, заснованого 1945 року для допомоги повоєнним біженцям. Згодом Українська канадська соціальна служба розвинулася на національному рівні, а Едмонтонське відділення було зареєстроване 14 жовтня 1977 року.',
    'Since then, UCSS Edmonton has provided social services to new immigrants, seniors, and others requiring help. The office has moved over the years and is now located at 11717 - 97 Street.': 'Відтоді UCSS Edmonton надає соціальні послуги новим іммігрантам, старшим людям та іншим особам, які потребують допомоги. Офіс із роками змінював місце розташування і тепер знаходиться за адресою 11717 - 97 Street.',
    'UCSS has supported waves of newcomers, sponsored families, assisted refugees, and adapted its immigration, settlement, senior, pension, benefit, disability, and community support services as needs evolved.': 'ССУК підтримувала хвилі новоприбулих, спонсорувала сімʼї, допомагала біженцям і адаптувала свої імміграційні, поселенські, пенсійні, соціальні, інвалідні та громадські послуги відповідно до змін потреб.',
    'Community fundraising, grants, bingos, casinos, donors, volunteers, and board members continue to support the daily work of the organization.': 'Громадські збірки коштів, гранти, бінґо, казино, жертводавці, волонтери та члени Управи продовжують підтримувати щоденну працю організації.',
    'UCSS (Edmonton) Board of Directors 2023-2024': 'Управа ССУК (Едмонтон) 2023-2024',
    'Honorary Members': 'Почесні члени',
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
    'UCSS Edmonton invites you to become a member, participate in programs, or volunteer your time to help others.': 'UCSS Edmonton запрошує вас стати членом організації, брати участь у програмах або присвятити свій час допомозі іншим.',
    'Download and complete the membership form.': 'Завантажте та заповніть форму членства.',
    'Bring in or mail the application with membership fee to UCSS Edmonton.': 'Принесіть або надішліть заяву разом із членським внеском до UCSS Edmonton.',
    'Contact the office at 780-471-4477 or ucss@shaw.ca for more information.': 'Для додаткової інформації звертайтеся до офісу за телефоном 780-471-4477 або електронною поштою ucss@shaw.ca.',
    'Download Membership Form': 'Завантажити форму членства',
    'Volunteering': 'Волонтерство',
    'Daily operations are possible thanks to benefactors and volunteers. UCSS welcomes people who can offer time to support the agency and community members in need.': 'Щоденна діяльність можлива завдяки благодійникам і волонтерам. ССУК радо приймає людей, які можуть присвятити час підтримці агенції та членів громади в потребі.',
    'Download and complete the volunteer form.': 'Завантажте та заповніть волонтерську форму.',
    'Bring in or mail the completed application to 11717 - 97th Street.': 'Принесіть або надішліть заповнену заяву на адресу 11717 - 97th Street.',
    'For fundraising events, call (780) 471-4477.': 'Щодо допомоги з фандрейзинговими подіями телефонуйте (780) 471-4477.',
    'Download Volunteer Form': 'Завантажити волонтерську форму',
    'How we serve our community': 'Як ми служимо нашій громаді',
    'Settlement, community, and immigration services based on the current UCSS Edmonton Services page.': 'Поселенські, громадські та імміграційні послуги на основі чинної сторінки послуг UCSS Edmonton.',
    'Settlement Services': 'Поселенські послуги',
    'UCSS provides guidance and advice for newcomers settling in Edmonton and Alberta.': 'ССУК надає поради та супровід новоприбулим, які поселяються в Едмонтоні та Альберті.',
    'Finding rental residences or learning how to purchase real estate': 'Пошук орендованого житла або інформація про купівлю нерухомості',
    'Job searches': 'Пошук роботи',
    'Applying for SIN and the Alberta Health Care Plan': 'Подання заяви на SIN та Alberta Health Care Plan',
    'Educational services including ESL and post-secondary options': 'Освітні послуги, включно з ESL та варіантами післясередньої освіти',
    'School registration for children': 'Реєстрація дітей до школи',
    'Cooperation with the Consulate General of Ukraine in Edmonton': 'Співпраця з Генеральним консульством України в Едмонтоні',
    'Cooperation with Ukrainian Catholic and Orthodox churches': 'Співпраця з Українською Католицькою та Православною Церквами',
    'Useful Links': 'Корисні посилання',
    'Houses for sale': 'Житло на продаж',
    'Houses for rent': 'Житло в оренду',
    'Jobs': 'Робота',
    'SIN Card application': 'Заява на отримання SIN',
    'Alberta Health Care Card': 'Картка медичного страхування Альберти',
    'Community Services': 'Громадські послуги',
    'UCSS assists seniors, families, women, youth, the sick, and those in need with social support information and referrals.': 'ССУК допомагає старшим людям, сімʼям, жінкам, молоді, хворим та людям у потребі інформацією про соціальну підтримку і скеруваннями.',
    'Information about social services': 'Інформація про соціальні послуги',
    'Information for seniors about welfare programs': 'Інформація для старших людей про програми соціальної допомоги',
    'Information on family benefit programs including Canada Child Benefit and Alberta Child and Family Benefit': 'Інформація про програми допомоги сімʼям, зокрема Canada Child Benefit та Alberta Child and Family Benefit',
    'Information about unemployment assistance and Employment Insurance': 'Інформація про допомогу з безробіття та Employment Insurance',
    'Translation services': 'Перекладацькі послуги',
    'Information about public and government organizations': 'Інформація про громадські та державні організації',
    'Edmonton property taxes': 'Податки на нерухомість в Едмонтоні',
    'Immigration Services': 'Імміграційні послуги',
    'UCSS provides general information and referral support for immigration questions.': 'ССУК надає загальну інформацію та скерування щодо імміграційних питань.',
    'General information about immigration regulations': 'Загальна інформація про імміграційні правила',
    'Information on immigration procedures and government information': 'Інформація про імміграційні процедури та державні ресурси',
    'Referrals to immigration specialists and lawyers': 'Скерування до імміграційних спеціалістів та юристів',
    'Official Canada Immigration website': 'Офіційний сайт імміграції Канади',
    'Helpful resources from the original UCSS Services page.': 'Корисні ресурси з оригінальної сторінки послуг ССУК.',
    'These links connect community members to housing, employment, education, health, immigration, seniors, family, and community resources.': 'Ці посилання допомагають членам громади знайти ресурси щодо житла, працевлаштування, освіти, здоровʼя, імміграції, старших людей, сімʼї та громади.',
    'Language Instruction for Newcomers': 'Мовне навчання для новоприбулих',
    'Find a daycare': 'Знайти дитячий садок',
    'Norwood Child and Family Resource Centre': 'Ресурсний центр Norwood для дітей і сімей',
    'Ukrainian daycares': 'Українські дитячі садки',
    'Ukrainian Catholic Church': 'Українська Католицька Церква',
    'Ukrainian Orthodox Church': 'Українська Православна Церква',
    'Old Age Security': 'Old Age Security',
    'Housing for seniors': 'Житло для старших людей',
    'Canada Child Benefit': 'Canada Child Benefit',
    'Employment Insurance': 'Employment Insurance',
    'Action for Healthy Communities': 'Action for Healthy Communities',
    'Ukrainian Canadian Congress - Alberta': 'Конґрес українців Канади - Альберта',
    'Original UCSS gallery images': 'Оригінальні світлини з галереї ССУК',
    'Images grouped from the current UCSS Edmonton Gallery page.': 'Світлини згруповано з чинної сторінки галереї UCSS Edmonton.',
    'Welcome Center Volunteers - June 20, 2022': 'Волонтери Welcome Center - 20 червня 2022',
    'Welcome Center Volunteers': 'Волонтери Welcome Center',
    'June 20, 2022': '20 червня 2022',
    'Volunteer support': 'Волонтерська підтримка',
    'Meet and Greet for Ukrainian Nationals - August 9, 2022': 'Зустріч для громадян України - 9 серпня 2022',
    'Meet and Greet': 'Зустріч громади',
    'August 9, 2022': '9 серпня 2022',
    'Community gathering': 'Громадська зустріч',
    'Community support': 'Підтримка громади',
    'Ukrainian Nationals': 'Громадяни України',
    'Kingsway Mall - Ukrainian Nationals': 'Kingsway Mall - громадяни України',
    'Christmas Volunteer Appreciation - Dec. 15, 2021': 'Різдвяна подяка волонтерам - 15 грудня 2021',
    'Christmas Volunteer Appreciation': 'Різдвяна подяка волонтерам',
    'Dec. 15, 2021': '15 грудня 2021',
    'Dear Community Members!': 'Дорогі члени громади!',
    'Your support enables UCSS Edmonton to continue providing free community services locally and abroad.': 'Ваша підтримка дає змогу UCSS Edmonton і надалі надавати безкоштовні громадські послуги тут і за кордоном.',
    '1. By cheque to:': '1. Чеком на адресу:',
    'Payable to:': 'Виписати на:',
    '2. By Interac e-transfer:': '2. Переказом Interac e-transfer:',
    'Make your donation to:': 'Надішліть пожертву на:',
    'Please include your full name and address, and advise whether you wish to receive a tax receipt. Follow with an email to': 'Будь ласка, вкажіть своє повне імʼя та адресу, а також повідомте, чи бажаєте отримати податкову квитанцію. Після цього надішліть лист на',
    'Every Fall Ukrainian Canadian Social Services (Edmonton) turns to the community with a request to support its annual fundraising campaign. UCSS activity is guided by the needs of our community in Canada and throughout the world.': 'Щоосені Суспільна служба українців Канади (Едмонтон) звертається до громади з проханням підтримати щорічну кампанію зі збору коштів. Діяльність ССУК визначається потребами нашої громади в Канаді та в усьому світі.',
    'UCSS helps new immigrants, elderly, sick and isolated community members, and victims of natural disasters and catastrophes. Services are free of charge and open to community members.': 'ССУК допомагає новим іммігрантам, старшим, хворим та ізольованим членам громади, а також жертвам стихійних лих і катастроф. Послуги є безкоштовними та відкритими для членів громади.',
    'Daily operations rely on the goodwill of those who understand the need for services that support vulnerable members of our community here in Canada and abroad.': 'Щоденна діяльність залежить від доброї волі тих, хто розуміє потребу в послугах для вразливих членів нашої громади тут, у Канаді, та за кордоном.',
    'For all donations $10 and more income tax receipts will be issued.': 'На всі пожертви від 10 доларів і більше видаються податкові квитанції.',
    'Thank you for your donations!': 'Дякуємо за ваші пожертви!',
    'Funding Request Form': 'Форма запиту на фінансування'
};

function currentLanguage() {
    return localStorage.getItem('ucss-language') || 'en';
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
