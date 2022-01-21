import React, { useState } from 'react';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import ru from 'date-fns/locale/ru';
import './App.css';

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

function withPrettyDateTime(Component) {
  return function (props) {
    let prettyDate;
    let unit;
    const seconds = (new Date() - new Date(props.date)) / 1000;

    if (seconds < 3600) {
      unit = 'minute';
    } else if (seconds < 3600 * 24) {
      unit = 'hour';
    } else {
      unit = 'day';
    }
    prettyDate = formatDistanceStrict(new Date(props.date), new Date(), {
      addSuffix: true,
      unit: unit,
      locale: ru,
    });
    return <Component {...props} date={prettyDate} />;
  };
}

const DateTimePretty = withPrettyDateTime(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]);

  return <VideoList list={list} />;
}
