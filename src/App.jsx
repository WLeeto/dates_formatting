import React from 'react';

function DateTimePretty(WrappedComponent) {
  return class extends React.Component {
    formatDateTime = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        return `${seconds} секунд назад`;
      } else if (minutes < 60) {
        return `${minutes} минут назад`;
      } else if (hours < 24) {
        return `${hours} часов назад`;
      } else {
        return `${days} дней назад`;
      }
    };

    render() {
      return <WrappedComponent date={this.formatDateTime(this.props.date)} />;
    }
  };
}

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

function Video(props) {
  const DateTimeComponent = DateTimePretty(DateTime);

  return (
    <div className="video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <DateTimeComponent date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => (
    <Video url={item.url} date={item.date} key={item.url} />
  ));
}

export default function App() {
  const list = [
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    }
  ];

  return <VideoList list={list} />;
}