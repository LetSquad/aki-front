import { MetroLine, MetroStation } from "@models/metro/enums";
import metroLine1 from "@static/images/metroLine1.svg";
import metroLine2 from "@static/images/metroLine2.svg";
import metroLine3 from "@static/images/metroLine3.svg";
import metroLine4 from "@static/images/metroLine4.svg";
import metroLine4A from "@static/images/metroLine4A.svg";
import metroLine5 from "@static/images/metroLine5.svg";
import metroLine6 from "@static/images/metroLine6.svg";
import metroLine7 from "@static/images/metroLine7.svg";
import metroLine8 from "@static/images/metroLine8.svg";
import metroLine8A from "@static/images/metroLine8A.svg";
import metroLine9 from "@static/images/metroLine9.svg";
import metroLine10 from "@static/images/metroLine10.svg";
import metroLine11 from "@static/images/metroLine11.svg";
import metroLine11A from "@static/images/metroLine11A.svg";
import metroLine12 from "@static/images/metroLine12.svg";
import metroLine13 from "@static/images/metroLine13.svg";
import metroLine14 from "@static/images/metroLine14.svg";
import metroLine15 from "@static/images/metroLine15.svg";

export function getMetroStationTitleFromEnum(metroStation: MetroStation): string {
    switch (metroStation) {
        case MetroStation.AEROPORT: {
            return "Аэропорт";
        }
        case MetroStation.AKADEMICHESKAYA: {
            return "Академическая";
        }
        case MetroStation.ALEKSANDROVSKIJ_SAD: {
            return "Александровский сад";
        }
        case MetroStation.ALEKSEEVSKAYA: {
            return "Алексеевская";
        }
        case MetroStation.ALMA_ATINSKAYA: {
            return "Алма-Атинская";
        }
        case MetroStation.ALTUFEVO: {
            return "Алтуфьево";
        }
        case MetroStation.AMINEVSKAYA: {
            return "Аминьевская";
        }
        case MetroStation.ANDRONOVKA: {
            return "Андроновка";
        }
        case MetroStation.ANNINO: {
            return "Аннино";
        }
        case MetroStation.ARBATSKAYA: {
            return "Арбатская";
        }
        case MetroStation.AVIAMOTORNAYA: {
            return "Авиамоторная";
        }
        case MetroStation.AVTOZAVODSKAYA: {
            return "Автозаводская";
        }
        case MetroStation.BABUSHKINSKAYA: {
            return "Бабушкинская";
        }
        case MetroStation.BAGRATIONOVSKAYA: {
            return "Багратионовская";
        }
        case MetroStation.BALTIJSKAYA: {
            return "Балтийская";
        }
        case MetroStation.BARRIKADNAYA: {
            return "Баррикадная";
        }
        case MetroStation.BAUMANSKAYA: {
            return "Бауманская";
        }
        case MetroStation.BEGOVAYA: {
            return "Беговая";
        }
        case MetroStation.BELOKAMENNAYA: {
            return "Белокаменная";
        }
        case MetroStation.BELOMORSKAYA: {
            return "Беломорская";
        }
        case MetroStation.BELORUSSKAYA: {
            return "Белорусская";
        }
        case MetroStation.BELYAEVO: {
            return "Беляево";
        }
        case MetroStation.BIBIREVO: {
            return "Бибирево";
        }
        case MetroStation.BIBLIOTEKA_IMENI_LENINA: {
            return "Библиотека имени Ленина";
        }
        case MetroStation.BITCEVSKIJ_PARK: {
            return "Битцевский парк";
        }
        case MetroStation.BORISOVO: {
            return "Борисово";
        }
        case MetroStation.BOROVICKAYA: {
            return "Боровицкая";
        }
        case MetroStation.BOROVSKOE_SHOSSE: {
            return "Боровское шоссе";
        }
        case MetroStation.BOTANICHESKIJ_SAD: {
            return "Ботанический сад";
        }
        case MetroStation.BRATISLAVSKAYA: {
            return "Братиславская";
        }
        case MetroStation.BULVAR_ADMIRALA_USHAKOVA: {
            return "Бульвар адмирала Ушакова";
        }
        case MetroStation.BULVAR_DMITRIYA_DONSKOGO: {
            return "Бульвар Дмитрия Донского";
        }
        case MetroStation.BULVAR_ROKOSSOVSKOGO: {
            return "Бульвар Рокоссовского";
        }
        case MetroStation.BUNINSKAYA_ALLEYA: {
            return "Бунинская аллея";
        }
        case MetroStation.BUTYRSKAYA: {
            return "Бутырская";
        }
        case MetroStation.CARICYNO: {
            return "Царицыно";
        }
        case MetroStation.CHEKHOVSKAYA: {
            return "Чеховская";
        }
        case MetroStation.CHERKIZOVSKAYA: {
            return "Черкизовская";
        }
        case MetroStation.CHERTANOVSKAYA: {
            return "Чертановская";
        }
        case MetroStation.CHISTYE_PRUDY: {
            return "Чистые пруды";
        }
        case MetroStation.CHKALOVSKAYA: {
            return "Чкаловская";
        }
        case MetroStation.CSKA: {
            return "ЦСКА";
        }
        case MetroStation.CVETNOJ_BULVAR: {
            return "Цветной бульвар";
        }
        case MetroStation.DAVYDKOVO: {
            return "Давыдково";
        }
        case MetroStation.DELOVOJ_CENTR: {
            return "Деловой центр";
        }
        case MetroStation.DINAMO: {
            return "Динамо";
        }
        case MetroStation.DMITROVSKAYA: {
            return "Дмитровская";
        }
        case MetroStation.DMITROVSKOE_SHOSSE: {
            return "Дмитровское шоссе";
        }
        case MetroStation.DOBRYNINSKAYA: {
            return "Добрынинская";
        }
        case MetroStation.DOMODEDOVSKAYA: {
            return "Домодедовская";
        }
        case MetroStation.DOROGOMILOVSKAYA: {
            return "Дорогомиловская";
        }
        case MetroStation.DOSTOEVSKAYA: {
            return "Достоевская";
        }
        case MetroStation.DUBROVKA: {
            return "Дубровка";
        }
        case MetroStation.ELEKTROZAVODSKAYA: {
            return "Электрозаводская";
        }
        case MetroStation.FILATOV_LUG: {
            return "Филатов луг";
        }
        case MetroStation.FILI: {
            return "Фили";
        }
        case MetroStation.FILYOVSKIJ_PARK: {
            return "Филёвский парк";
        }
        case MetroStation.FONVIZINSKAYA: {
            return "Фонвизинская";
        }
        case MetroStation.FRUNZENSKAYA: {
            return "Фрунзенская";
        }
        case MetroStation.GOVOROVO: {
            return "Говорово";
        }
        case MetroStation.HOROSHYOVO: {
            return "Хорошёво";
        }
        case MetroStation.HOROSHYOVSKAYA: {
            return "Хорошёвская";
        }
        case MetroStation.HOVRINO: {
            return "Ховрино";
        }
        case MetroStation.IZMAJLOVO: {
            return "Измайлово";
        }
        case MetroStation.IZMAJLOVSKAYA: {
            return "Измайловская";
        }
        case MetroStation.KAHOVSKAYA: {
            return "Каховская";
        }
        case MetroStation.KALUZHSKAYA: {
            return "Калужская";
        }
        case MetroStation.KANTEMIROVSKAYA: {
            return "Кантемировская";
        }
        case MetroStation.KASHIRSKAYA: {
            return "Каширская";
        }
        case MetroStation.KIEVSKAYA: {
            return "Киевская";
        }
        case MetroStation.KITAJ_GOROD: {
            return "Китай-город";
        }
        case MetroStation.KLENOVYJ_BULVAR: {
            return "Кленовый бульвар";
        }
        case MetroStation.KOLOMENSKAYA: {
            return "Коломенская";
        }
        case MetroStation.KOMMUNARKA: {
            return "Коммунарка";
        }
        case MetroStation.KOMSOMOLSKAYA: {
            return "Комсомольская";
        }
        case MetroStation.KONKOVO: {
            return "Коньково";
        }
        case MetroStation.KOPTEVO: {
            return "Коптево";
        }
        case MetroStation.KOSINO: {
            return "Косино";
        }
        case MetroStation.KOTELNIKI: {
            return "Котельники";
        }
        case MetroStation.KOZHUHOVSKAYA: {
            return "Кожуховская";
        }
        case MetroStation.KRASNOGVARDEJSKAYA: {
            return "Красногвардейская";
        }
        case MetroStation.KRASNOPRESNENSKAYA: {
            return "Краснопресненская";
        }
        case MetroStation.KRASNOSELSKAYA: {
            return "Красносельская";
        }
        case MetroStation.KRASNYE_VOROTA: {
            return "Красные ворота";
        }
        case MetroStation.KRESTYANSKAYA_ZASTAVA: {
            return "Крестьянская застава";
        }
        case MetroStation.KROPOTKINSKAYA: {
            return "Кропоткинская";
        }
        case MetroStation.KRYLATSKOE: {
            return "Крылатское";
        }
        case MetroStation.KRYMSKAYA: {
            return "Крымская";
        }
        case MetroStation.KUNCEVSKAYA: {
            return "Кунцевская";
        }
        case MetroStation.KURSKAYA: {
            return "Курская";
        }
        case MetroStation.KUTUZOVSKAYA: {
            return "Кутузовская";
        }
        case MetroStation.KUZMINKI: {
            return "Кузьминки";
        }
        case MetroStation.KUZNECKIJ_MOST: {
            return "Кузнецкий мост";
        }
        case MetroStation.LEFORTOVO: {
            return "Лефортово";
        }
        case MetroStation.LENINSKIJ_PROSPEKT: {
            return "Ленинский проспект";
        }
        case MetroStation.LERMONTOVSKIJ_PROSPEKT: {
            return "Лермонтовский проспект";
        }
        case MetroStation.LESOPARKOVAYA: {
            return "Лесопарковая";
        }
        case MetroStation.LIHOBORY: {
            return "Лихоборы";
        }
        case MetroStation.LOKOMOTIV: {
            return "Локомотив";
        }
        case MetroStation.LOMONOSOVSKIJ_PROSPEKT: {
            return "Ломоносовский проспект";
        }
        case MetroStation.LUBYANKA: {
            return "Лубянка";
        }
        case MetroStation.LUHMANOVSKAYA: {
            return "Лухмановская";
        }
        case MetroStation.LUZHNIKI: {
            return "Лужники";
        }
        case MetroStation.LYUBLINO: {
            return "Люблино";
        }
        case MetroStation.MARINA_ROSHCHA: {
            return "Марьина Роща";
        }
        case MetroStation.MARINO: {
            return "Марьино";
        }
        case MetroStation.MARKSISTSKAYA: {
            return "Марксистская";
        }
        case MetroStation.MAYAKOVSKAYA: {
            return "Маяковская";
        }
        case MetroStation.MEDVEDKOVO: {
            return "Медведково";
        }
        case MetroStation.MENDELEEVSKAYA: {
            return "Менделеевская";
        }
        case MetroStation.MEZHDUNARODNAYA: {
            return "Международная";
        }
        case MetroStation.MICHURINSKIJ_PROSPEKT: {
            return "Мичуринский проспект";
        }
        case MetroStation.MINSKAYA: {
            return "Минская";
        }
        case MetroStation.MITINO: {
            return "Митино";
        }
        case MetroStation.MNYOVNIKI: {
            return "Мнёвники";
        }
        case MetroStation.MOLODYOZHNAYA: {
            return "Молодёжная";
        }
        case MetroStation.MYAKININO: {
            return "Мякинино";
        }
        case MetroStation.NAGATINSKAYA: {
            return "Нагатинская";
        }
        case MetroStation.NAGATINSKIJ_ZATON: {
            return "Нагатинский Затон";
        }
        case MetroStation.NAGORNAYA: {
            return "Нагорная";
        }
        case MetroStation.NAHIMOVSKIJ_PROSPEKT: {
            return "Нахимовский проспект";
        }
        case MetroStation.NARODNOE_OPOLCHENIE: {
            return "Народное Ополчение";
        }
        case MetroStation.NEKRASOVKA: {
            return "Некрасовка";
        }
        case MetroStation.NIZHEGORODSKAYA: {
            return "Нижегородская";
        }
        case MetroStation.NOVATORSKAYA: {
            return "Новаторская";
        }
        case MetroStation.NOVOGIREEVO: {
            return "Новогиреево";
        }
        case MetroStation.NOVOHOHLOVSKAYA: {
            return "Новохохловская";
        }
        case MetroStation.NOVOKOSINO: {
            return "Новокосино";
        }
        case MetroStation.NOVOKUZNECKAYA: {
            return "Новокузнецкая";
        }
        case MetroStation.NOVOPEREDELKINO: {
            return "Новопеределкино";
        }
        case MetroStation.NOVOSLOBODSKAYA: {
            return "Новослободская";
        }
        case MetroStation.NOVOYASENEVSKAYA: {
            return "Новоясеневская";
        }
        case MetroStation.NOVYE_CHERYOMUSHKI: {
            return "Новые Черёмушки";
        }
        case MetroStation.OHOTNYJ_RYAD: {
            return "Охотный ряд";
        }
        case MetroStation.OKRUZHNAYA: {
            return "Окружная";
        }
        case MetroStation.OKSKAYA: {
            return "Окская";
        }
        case MetroStation.OKTYABRSKAYA: {
            return "Октябрьская";
        }
        case MetroStation.OKTYABRSKOE_POLE: {
            return "Октябрьское поле";
        }
        case MetroStation.OLHOVAYA: {
            return "Ольховая";
        }
        case MetroStation.OREKHOVO: {
            return "Орехово";
        }
        case MetroStation.OTRADNOE: {
            return "Отрадное";
        }
        case MetroStation.OZYORNAYA: {
            return "Озёрная";
        }
        case MetroStation.PANFILOVSKAYA: {
            return "Панфиловская";
        }
        case MetroStation.PARK_KULTURY: {
            return "Парк культуры";
        }
        case MetroStation.PARK_POBEDY: {
            return "Парк Победы";
        }
        case MetroStation.PARTIZANSKAYA: {
            return "Партизанская";
        }
        case MetroStation.PAVELECKAYA: {
            return "Павелецкая";
        }
        case MetroStation.PECHATNIKI: {
            return "Печатники";
        }
        case MetroStation.PEROVO: {
            return "Перово";
        }
        case MetroStation.PERVOMAJSKAYA: {
            return "Первомайская";
        }
        case MetroStation.PETROVSKIJ_PARK: {
            return "Петровский парк";
        }
        case MetroStation.PETROVSKO_RAZUMOVSKAYA: {
            return "Петровско-Разумовская";
        }
        case MetroStation.PIONERSKAYA: {
            return "Пионерская";
        }
        case MetroStation.PLANERNAYA: {
            return "Планерная";
        }
        case MetroStation.PLOSHCHAD_GAGARINA: {
            return "Площадь Гагарина";
        }
        case MetroStation.PLOSHCHAD_ILICHA: {
            return "Площадь Ильича";
        }
        case MetroStation.PLOSHCHAD_REVOLYUCII: {
            return "Площадь Революции";
        }
        case MetroStation.PLYUSHCHIHA: {
            return "Плющиха";
        }
        case MetroStation.POLEZHAEVSKAYA: {
            return "Полежаевская";
        }
        case MetroStation.POLYANKA: {
            return "Полянка";
        }
        case MetroStation.PRAZHSKAYA: {
            return "Пражская";
        }
        case MetroStation.PREOBRAZHENSKAYA_PLOSHCHAD: {
            return "Преображенская площадь";
        }
        case MetroStation.PROFSOYUZNAYA: {
            return "Профсоюзная";
        }
        case MetroStation.PROKSHINO: {
            return "Прокшино";
        }
        case MetroStation.PROLETARSKAYA: {
            return "Пролетарская";
        }
        case MetroStation.PROSPEKT_MIRA: {
            return "Проспект Мира";
        }
        case MetroStation.PROSPEKT_VERNADSKOGO: {
            return "Проспект Вернадского";
        }
        case MetroStation.PUSHKINSKAYA: {
            return "Пушкинская";
        }
        case MetroStation.PYATNICKOE_SHOSSE: {
            return "Пятницкое шоссе";
        }
        case MetroStation.RAMENKI: {
            return "Раменки";
        }
        case MetroStation.RASSKAZOVKA: {
            return "Рассказовка";
        }
        case MetroStation.RECHNOJ_VOKZAL: {
            return "Речной вокзал";
        }
        case MetroStation.RIMSKAYA: {
            return "Римская";
        }
        case MetroStation.RIZHSKAYA: {
            return "Рижская";
        }
        case MetroStation.ROSTOKINO: {
            return "Ростокино";
        }
        case MetroStation.RUMYANCEVO: {
            return "Румянцево";
        }
        case MetroStation.RYAZANSKIJ_PROSPEKT: {
            return "Рязанский проспект";
        }
        case MetroStation.SALAREVO: {
            return "Саларьево";
        }
        case MetroStation.SAVYOLOVSKAYA: {
            return "Савёловская";
        }
        case MetroStation.SELIGERSKAYA: {
            return "Селигерская";
        }
        case MetroStation.SEMYONOVSKAYA: {
            return "Семёновская";
        }
        case MetroStation.SERPUHOVSKAYA: {
            return "Серпуховская";
        }
        case MetroStation.SEVASTOPOLSKAYA: {
            return "Севастопольская";
        }
        case MetroStation.SHABOLOVSKAYA: {
            return "Шаболовская";
        }
        case MetroStation.SHCHUKINSKAYA: {
            return "Щукинская";
        }
        case MetroStation.SHCHYOLKOVSKAYA: {
            return "Щёлковская";
        }
        case MetroStation.SHELEPIHA: {
            return "Шелепиха";
        }
        case MetroStation.SHIPILOVSKAYA: {
            return "Шипиловская";
        }
        case MetroStation.SHOSSE_ENTUZIASTOV: {
            return "Шоссе Энтузиастов";
        }
        case MetroStation.SKHODNENSKAYA: {
            return "Сходненская";
        }
        case MetroStation.SLAVYANSKIJ_BULVAR: {
            return "Славянский бульвар";
        }
        case MetroStation.SMOLENSKAYA: {
            return "Смоленская";
        }
        case MetroStation.SOKOL: {
            return "Сокол";
        }
        case MetroStation.SOKOLINAYA_GORA: {
            return "Соколиная Гора";
        }
        case MetroStation.SOKOLNIKI: {
            return "Сокольники";
        }
        case MetroStation.SOLNCEVO: {
            return "Солнцево";
        }
        case MetroStation.SPARTAK: {
            return "Спартак";
        }
        case MetroStation.SPORTIVNAYA: {
            return "Спортивная";
        }
        case MetroStation.SRETENSKIJ_BULVAR: {
            return "Сретенский бульвар";
        }
        case MetroStation.STAHANOVSKAYA: {
            return "Стахановская";
        }
        case MetroStation.STRESHNEVO: {
            return "Стрешнево";
        }
        case MetroStation.STROGINO: {
            return "Строгино";
        }
        case MetroStation.STUDENCHESKAYA: {
            return "Студенческая";
        }
        case MetroStation.SUHAREVSKAYA: {
            return "Сухаревская";
        }
        case MetroStation.SUVOROVSKAYA: {
            return "Суворовская";
        }
        case MetroStation.SVIBLOVO: {
            return "Свиблово";
        }
        case MetroStation.TAGANSKAYA: {
            return "Таганская";
        }
        case MetroStation.TEATRALNAYA: {
            return "Театральная";
        }
        case MetroStation.TEKHNOPARK: {
            return "Технопарк";
        }
        case MetroStation.TEKSTILSHCHIKI: {
            return "Текстильщики";
        }
        case MetroStation.TELECENTR: {
            return "Телецентр";
        }
        case MetroStation.TEREKHOVO: {
            return "Терехово";
        }
        case MetroStation.TIMIRYAZEVSKAYA: {
            return "Тимирязевская";
        }
        case MetroStation.TRETYAKOVSKAYA: {
            return "Третьяковская";
        }
        case MetroStation.TROPARYOVO: {
            return "Тропарёво";
        }
        case MetroStation.TRUBNAYA: {
            return "Трубная";
        }
        case MetroStation.TULSKAYA: {
            return "Тульская";
        }
        case MetroStation.TURGENEVSKAYA: {
            return "Тургеневская";
        }
        case MetroStation.TUSHINSKAYA: {
            return "Тушинская";
        }
        case MetroStation.TVERSKAYA: {
            return "Тверская";
        }
        case MetroStation.TYOPLYJ_STAN: {
            return "Тёплый стан";
        }
        case MetroStation.UGRESHSKAYA: {
            return "Угрешская";
        }
        case MetroStation.ULICA_1905_GODA: {
            return "Улица 1905 года";
        }
        case MetroStation.ULICA_AKADEMIKA_KOROLYOVA: {
            return "Улица Академика Королёва";
        }
        case MetroStation.ULICA_AKADEMIKA_YANGELYA: {
            return "Улица академика Янгеля";
        }
        case MetroStation.ULICA_DMITRIEVSKOGO: {
            return "улица Дмитриевского";
        }
        case MetroStation.ULICA_GORCHAKOVA: {
            return "Улица Горчакова";
        }
        case MetroStation.ULICA_MILASHENKOVA: {
            return "Улица Милашенкова";
        }
        case MetroStation.ULICA_SERGEYA_EJZENSHTEJNA: {
            return "Улица Сергея Эйзенштейна";
        }
        case MetroStation.ULICA_SKOBELEVSKAYA: {
            return "Улица Скобелевская";
        }
        case MetroStation.ULICA_STAROKACHALOVSKAYA: {
            return "Улица Старокачаловская";
        }
        case MetroStation.UNIVERSITET: {
            return "Университет";
        }
        case MetroStation.VARSHAVSKAYA: {
            return "Варшавская";
        }
        case MetroStation.VDNH: {
            return "ВДНХ";
        }
        case MetroStation.VERHNIE_KOTLY: {
            return "Верхние Котлы";
        }
        case MetroStation.VERHNIE_LIHOBORY: {
            return "Верхние Лихоборы";
        }
        case MetroStation.VLADYKINO: {
            return "Владыкино";
        }
        case MetroStation.VODNYJ_STADION: {
            return "Водный стадион";
        }
        case MetroStation.VOJKOVSKAYA: {
            return "Войковская";
        }
        case MetroStation.VOLGOGRADSKIJ_PROSPEKT: {
            return "Волгоградский проспект";
        }
        case MetroStation.VOLHONKA: {
            return "Волхонка";
        }
        case MetroStation.VOLOKOLAMSKAYA: {
            return "Волоколамская";
        }
        case MetroStation.VOLZHSKAYA: {
            return "Волжская";
        }
        case MetroStation.VOROBYOVY_GORY: {
            return "Воробьёвы горы";
        }
        case MetroStation.VORONCOVSKAYA: {
            return "Воронцовская";
        }
        case MetroStation.VYHINO: {
            return "Выхино";
        }
        case MetroStation.VYSTAVOCHNAYA: {
            return "Выставочная";
        }
        case MetroStation.VYSTAVOCHNYJ_CENTR: {
            return "Выставочный центр";
        }
        case MetroStation.YASENEVO: {
            return "Ясенево";
        }
        case MetroStation.YUGO_VOSTOCHNAYA: {
            return "Юго-Восточная";
        }
        case MetroStation.YUGO_ZAPADNAYA: {
            return "Юго-Западная";
        }
        case MetroStation.YUZHNAYA: {
            return "Южная";
        }
        case MetroStation.ZHULEBINO: {
            return "Жулебино";
        }
        case MetroStation.ZIL: {
            return "ЗИЛ";
        }
        case MetroStation.ZORGE: {
            return "Зорге";
        }
        case MetroStation.ZYABLIKOVO: {
            return "Зябликово";
        }
        case MetroStation.ZYUZINO: {
            return "Зюзино";
        }
        // skip default
    }
}

export function getMetroLinesByMetroStation(metroStation: MetroStation): MetroLine[] {
    switch (metroStation) {
        case MetroStation.AEROPORT: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.AKADEMICHESKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.ALEKSANDROVSKIJ_SAD: {
            return [MetroLine.FILYOVSKAYA];
        }
        case MetroStation.ALEKSEEVSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.ALMA_ATINSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.ALTUFEVO: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.AMINEVSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.ANDRONOVKA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.ANNINO: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.ARBATSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.FILYOVSKAYA];
        }
        case MetroStation.AVIAMOTORNAYA: {
            return [MetroLine.KALININSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.AVTOZAVODSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.BABUSHKINSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.BAGRATIONOVSKAYA: {
            return [MetroLine.FILYOVSKAYA];
        }
        case MetroStation.BALTIJSKAYA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.BARRIKADNAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.BAUMANSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.BEGOVAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.BELOKAMENNAYA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.BELOMORSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.BELORUSSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA, MetroLine.KOLCEVAYA];
        }
        case MetroStation.BELYAEVO: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.BIBIREVO: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.BIBLIOTEKA_IMENI_LENINA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.BITCEVSKIJ_PARK: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.BORISOVO: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.BOROVICKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.BOROVSKOE_SHOSSE: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.BOTANICHESKIJ_SAD: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.BRATISLAVSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.BULVAR_ADMIRALA_USHAKOVA: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.BULVAR_DMITRIYA_DONSKOGO: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.BULVAR_ROKOSSOVSKOGO: {
            return [MetroLine.SOKOLNICHESKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.BUNINSKAYA_ALLEYA: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.BUTYRSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.CARICYNO: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.CHEKHOVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.CHERKIZOVSKAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.CHERTANOVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.CHISTYE_PRUDY: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.CHKALOVSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.CSKA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.CVETNOJ_BULVAR: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.DAVYDKOVO: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.DELOVOJ_CENTR: {
            return [MetroLine.SOLNCEVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA_A, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.DINAMO: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.DMITROVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.DMITROVSKOE_SHOSSE: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.DOBRYNINSKAYA: {
            return [MetroLine.KOLCEVAYA];
        }
        case MetroStation.DOMODEDOVSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.DOROGOMILOVSKAYA: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.DOSTOEVSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.DUBROVKA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.ELEKTROZAVODSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.FILATOV_LUG: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.FILI: {
            return [MetroLine.FILYOVSKAYA];
        }
        case MetroStation.FILYOVSKIJ_PARK: {
            return [MetroLine.FILYOVSKAYA];
        }
        case MetroStation.FONVIZINSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.FRUNZENSKAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.GOVOROVO: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.HOROSHYOVO: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.HOROSHYOVSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.HOVRINO: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.IZMAJLOVO: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.IZMAJLOVSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.KAHOVSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.KALUZHSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.KANTEMIROVSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.KASHIRSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.KIEVSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.FILYOVSKAYA, MetroLine.KOLCEVAYA];
        }
        case MetroStation.KITAJ_GOROD: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA, MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.KLENOVYJ_BULVAR: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.KOLOMENSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.KOMMUNARKA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.KOMSOMOLSKAYA: {
            return [MetroLine.SOKOLNICHESKAYA, MetroLine.KOLCEVAYA];
        }
        case MetroStation.KONKOVO: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.KOPTEVO: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.KOSINO: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.KOTELNIKI: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.KOZHUHOVSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.KRASNOGVARDEJSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.KRASNOPRESNENSKAYA: {
            return [MetroLine.KOLCEVAYA];
        }
        case MetroStation.KRASNOSELSKAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.KRASNYE_VOROTA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.KRESTYANSKAYA_ZASTAVA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.KROPOTKINSKAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.KRYLATSKOE: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.KRYMSKAYA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.KUNCEVSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.FILYOVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.KURSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.KOLCEVAYA];
        }
        case MetroStation.KUTUZOVSKAYA: {
            return [MetroLine.FILYOVSKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.KUZMINKI: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.KUZNECKIJ_MOST: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.LEFORTOVO: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.LENINSKIJ_PROSPEKT: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.LERMONTOVSKIJ_PROSPEKT: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.LESOPARKOVAYA: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.LIHOBORY: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.LOKOMOTIV: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.LOMONOSOVSKIJ_PROSPEKT: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.LUBYANKA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.LUHMANOVSKAYA: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.LUZHNIKI: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.LYUBLINO: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.MARINA_ROSHCHA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.MARINO: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.MARKSISTSKAYA: {
            return [MetroLine.KALININSKAYA];
        }
        case MetroStation.MAYAKOVSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.MEDVEDKOVO: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.MENDELEEVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.MEZHDUNARODNAYA: {
            return [MetroLine.FILYOVSKAYA_A];
        }
        case MetroStation.MICHURINSKIJ_PROSPEKT: {
            return [MetroLine.SOLNCEVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.MINSKAYA: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.MITINO: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.MNYOVNIKI: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.MOLODYOZHNAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.MYAKININO: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.NAGATINSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.NAGATINSKIJ_ZATON: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.NAGORNAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.NAHIMOVSKIJ_PROSPEKT: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.NARODNOE_OPOLCHENIE: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.NEKRASOVKA: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.NIZHEGORODSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO, MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.NOVATORSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.NOVOGIREEVO: {
            return [MetroLine.KALININSKAYA];
        }
        case MetroStation.NOVOHOHLOVSKAYA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.NOVOKOSINO: {
            return [MetroLine.KALININSKAYA];
        }
        case MetroStation.NOVOKUZNECKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.NOVOPEREDELKINO: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.NOVOSLOBODSKAYA: {
            return [MetroLine.KOLCEVAYA];
        }
        case MetroStation.NOVOYASENEVSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.NOVYE_CHERYOMUSHKI: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.OHOTNYJ_RYAD: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.OKRUZHNAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.OKSKAYA: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.OKTYABRSKAYA: {
            return [MetroLine.KOLCEVAYA, MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.OKTYABRSKOE_POLE: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.OLHOVAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.OREKHOVO: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.OTRADNOE: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.OZYORNAYA: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.PANFILOVSKAYA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.PARK_KULTURY: {
            return [MetroLine.SOKOLNICHESKAYA, MetroLine.KOLCEVAYA];
        }
        case MetroStation.PARK_POBEDY: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.PARTIZANSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.PAVELECKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA, MetroLine.KOLCEVAYA];
        }
        case MetroStation.PECHATNIKI: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.PEROVO: {
            return [MetroLine.KALININSKAYA];
        }
        case MetroStation.PERVOMAJSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.PETROVSKIJ_PARK: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.PETROVSKO_RAZUMOVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA, MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.PIONERSKAYA: {
            return [MetroLine.FILYOVSKAYA];
        }
        case MetroStation.PLANERNAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.PLOSHCHAD_GAGARINA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.PLOSHCHAD_ILICHA: {
            return [MetroLine.KALININSKAYA];
        }
        case MetroStation.PLOSHCHAD_REVOLYUCII: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.PLYUSHCHIHA: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.POLEZHAEVSKAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.POLYANKA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.PRAZHSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.PREOBRAZHENSKAYA_PLOSHCHAD: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.PROFSOYUZNAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.PROKSHINO: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.PROLETARSKAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.PROSPEKT_MIRA: {
            return [MetroLine.KOLCEVAYA, MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.PROSPEKT_VERNADSKOGO: {
            return [MetroLine.SOKOLNICHESKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.PUSHKINSKAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.PYATNICKOE_SHOSSE: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.RAMENKI: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.RASSKAZOVKA: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.RECHNOJ_VOKZAL: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.RIMSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.RIZHSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.ROSTOKINO: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.RUMYANCEVO: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.RYAZANSKIJ_PROSPEKT: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.SALAREVO: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.SAVYOLOVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.SELIGERSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.SEMYONOVSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.SERPUHOVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.SEVASTOPOLSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.SHABOLOVSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.SHCHUKINSKAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.SHCHYOLKOVSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.SHELEPIHA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA_A, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.SHIPILOVSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.SHOSSE_ENTUZIASTOV: {
            return [MetroLine.KALININSKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.SKHODNENSKAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.SLAVYANSKIJ_BULVAR: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.SMOLENSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA, MetroLine.FILYOVSKAYA];
        }
        case MetroStation.SOKOL: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.SOKOLINAYA_GORA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.SOKOLNIKI: {
            return [MetroLine.SOKOLNICHESKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.SOLNCEVO: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.SPARTAK: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.SPORTIVNAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.SRETENSKIJ_BULVAR: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.STAHANOVSKAYA: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.STRESHNEVO: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.STROGINO: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.STUDENCHESKAYA: {
            return [MetroLine.FILYOVSKAYA];
        }
        case MetroStation.SUHAREVSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.SUVOROVSKAYA: {
            return [MetroLine.KOLCEVAYA];
        }
        case MetroStation.SVIBLOVO: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.TAGANSKAYA: {
            return [MetroLine.KOLCEVAYA, MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.TEATRALNAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.TEKHNOPARK: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.TEKSTILSHCHIKI: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA, MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.TELECENTR: {
            return [MetroLine.MONORELS];
        }
        case MetroStation.TEREKHOVO: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.TIMIRYAZEVSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA, MetroLine.MONORELS];
        }
        case MetroStation.TRETYAKOVSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA, MetroLine.KALININSKAYA, MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.TROPARYOVO: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.TRUBNAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.TULSKAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.TURGENEVSKAYA: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.TUSHINSKAYA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.TVERSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.TYOPLYJ_STAN: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.UGRESHSKAYA: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.ULICA_1905_GODA: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.ULICA_AKADEMIKA_KOROLYOVA: {
            return [MetroLine.MONORELS];
        }
        case MetroStation.ULICA_AKADEMIKA_YANGELYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.ULICA_DMITRIEVSKOGO: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.ULICA_GORCHAKOVA: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.ULICA_MILASHENKOVA: {
            return [MetroLine.MONORELS];
        }
        case MetroStation.ULICA_SERGEYA_EJZENSHTEJNA: {
            return [MetroLine.MONORELS];
        }
        case MetroStation.ULICA_SKOBELEVSKAYA: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.ULICA_STAROKACHALOVSKAYA: {
            return [MetroLine.BUTOVSKAYA];
        }
        case MetroStation.UNIVERSITET: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.VARSHAVSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.VDNH: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.VERHNIE_KOTLY: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.VERHNIE_LIHOBORY: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.VLADYKINO: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA, MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.VODNYJ_STADION: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.VOJKOVSKAYA: {
            return [MetroLine.ZAMOSKVORECKAYA];
        }
        case MetroStation.VOLGOGRADSKIJ_PROSPEKT: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.VOLHONKA: {
            return [MetroLine.SOLNCEVSKAYA];
        }
        case MetroStation.VOLOKOLAMSKAYA: {
            return [MetroLine.ARBATSKO_POKROVSKAYA];
        }
        case MetroStation.VOLZHSKAYA: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.VOROBYOVY_GORY: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.VORONCOVSKAYA: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        case MetroStation.VYHINO: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.VYSTAVOCHNAYA: {
            return [MetroLine.FILYOVSKAYA_A];
        }
        case MetroStation.VYSTAVOCHNYJ_CENTR: {
            return [MetroLine.MONORELS];
        }
        case MetroStation.YASENEVO: {
            return [MetroLine.KALUZHSKO_RIZHSKAYA];
        }
        case MetroStation.YUGO_VOSTOCHNAYA: {
            return [MetroLine.NEKRASOVSKAYA];
        }
        case MetroStation.YUGO_ZAPADNAYA: {
            return [MetroLine.SOKOLNICHESKAYA];
        }
        case MetroStation.YUZHNAYA: {
            return [MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA];
        }
        case MetroStation.ZHULEBINO: {
            return [MetroLine.TAGANSKO_KRASNOPRESNENSKAYA];
        }
        case MetroStation.ZIL: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.ZORGE: {
            return [MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO];
        }
        case MetroStation.ZYABLIKOVO: {
            return [MetroLine.LYUBLINSKO_DMITROVSKAYA];
        }
        case MetroStation.ZYUZINO: {
            return [MetroLine.BOLSHAYA_KOLCEVAYA];
        }
        // skip default
    }
}

export function getMetroLineLogoByEnum(metroLine: MetroLine): string {
    switch (metroLine) {
        case MetroLine.ARBATSKO_POKROVSKAYA: {
            return metroLine3;
        }
        case MetroLine.BOLSHAYA_KOLCEVAYA: {
            return metroLine11;
        }
        case MetroLine.BOLSHAYA_KOLCEVAYA_A: {
            return metroLine11A;
        }
        case MetroLine.BUTOVSKAYA: {
            return metroLine12;
        }
        case MetroLine.ZAMOSKVORECKAYA: {
            return metroLine2;
        }
        case MetroLine.KALININSKAYA: {
            return metroLine8;
        }
        case MetroLine.KALUZHSKO_RIZHSKAYA: {
            return metroLine6;
        }
        case MetroLine.KOLCEVAYA: {
            return metroLine5;
        }
        case MetroLine.LYUBLINSKO_DMITROVSKAYA: {
            return metroLine10;
        }
        case MetroLine.MONORELS: {
            return metroLine13;
        }
        case MetroLine.MOSKOVSKOE_CENTRALNOE_KOLCO: {
            return metroLine14;
        }
        case MetroLine.NEKRASOVSKAYA: {
            return metroLine15;
        }
        case MetroLine.SERPUHOVSKO_TIMIRYAZEVSKAYA: {
            return metroLine9;
        }
        case MetroLine.SOKOLNICHESKAYA: {
            return metroLine1;
        }
        case MetroLine.SOLNCEVSKAYA: {
            return metroLine8A;
        }
        case MetroLine.TAGANSKO_KRASNOPRESNENSKAYA: {
            return metroLine7;
        }
        case MetroLine.FILYOVSKAYA: {
            return metroLine4;
        }
        case MetroLine.FILYOVSKAYA_A: {
            return metroLine4A;
        }
        // skip default
    }
}
