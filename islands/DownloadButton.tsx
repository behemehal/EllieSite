import { Component } from "preact";
import { useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

class DownloadButton extends Component {
  constructor() {
    super();
    this.state = { errored: true, loaded: true };

    //fetch(
    //  "https://api.github.com/repos/behemehal/ellie-language/releases/latest",
    //).then((response) =>
    //  response.json().then((json) => {
    //    if (!response.ok) {
    //      this.setState({ errored: true });
    //      console.log("error", response, json);
    //    } else {
    //      console.log("json", response);
    //      this.setState({ loaded: true, errored: false });
    //    }
    //  })
    //).catch((error) => {
    //  this.setState({ errored: true });
    //});
  }

  componentDidCatch(error: any) {
    console.log("error", error);
    this.setState({ errored: true });
  }

  render(props: any, state: any) {
    if (state.errored) {
      return (
        <button disabled className="btn btn-danger d-flex gap-1">
          <span class="material-icons">error</span>
          Failed to load last release
        </button>
      );
    } else if (!state.loaded) {
      return (
        <button disabled className="btn btn-theme d-flex gap-1">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      );
    } else {
      return (
        <button className="btn btn-theme d-flex gap-1">
          <span class="material-icons">file_download</span>
          Download
        </button>
      );
    }
  }
}

export default DownloadButton;

/*
export default function DownloadButton() {
    const [loaded, setCount] = useState(false)

    if (!loaded) {
        return <div>loading...</div>
    } else {
        return (
            <button className="btn btn-theme d-flex gap-1">
              <span class="material-icons">file_download</span>
              Download
            </button>
          );
        }



  if (IS_BROWSER) {
    fetch(
      "https://api.github.com/repos/ellie-lang/ellie/releases/latest",
    ).then((response) =>
      response.json().then((json) => {
        return (
          <button className="btn btn-theme d-flex gap-1">
            <span class="material-icons">file_download</span>
            Download
          </button>
        );
      })
    ).catch((error) => {
      return (
        <button className="btn btn-theme d-flex gap-1">
          <span class="material-icons">file_download</span>
          {error}
        </button>
      );
    });
  } else {
    return (
      <button disabled className="btn btn-theme d-flex gap-1">
        <span class="material-icons">file_download</span>
        Loading
      </button>
    );
  }
}
*/
