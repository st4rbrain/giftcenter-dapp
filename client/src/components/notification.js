import "./notification.css"

export function WithdrawNotification({withdrawnAmount, withdrawnToken}) {
    return ( 
        <div className="notification-success">
            <div className="notification-head">
                <div className="success-notification-logo"></div>
                <div className="notification-heading">{withdrawnAmount} {withdrawnToken} Withdrawn</div>
                <button className="success-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-success')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Refresh the page to reflect the changes
            </div>
        </div>
     );
}

export function SendGiftNotification() {
    return ( 
        <div className="notification-success">
            <div className="notification-head">
                <div className="success-notification-logo"></div>
                <div className="notification-heading">Sent Successfully</div>
                <button className="success-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-success')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Refresh the page after transaction confirmation
            </div>
        </div>
     );
}

export function GiftYourselfNotification() {
    return ( 
        <div className="notification-error">
            <div className="notification-head">
                <div className="error-notification-logo"></div>
                <div className="notification-heading">Error</div>
                <button className="error-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-error')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Can't Gift yourself
            </div>
        </div>
     );
}

export function UnsupportedNetworkNotification() {
    return ( 
        <div className="notification-error">
            <div className="notification-head">
                <div className="error-notification-logo"></div>
                <div className="notification-heading">Network Error</div>
                <button className="error-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-error')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Current Network is not supported
            </div>
        </div>
     );
}

export function WithdrawErrorNotification() {
    return ( 
        <div className="notification-error">
            <div className="notification-head">
                <div className="error-notification-logo"></div>
                <div className="notification-heading">Error</div>
                <button className="error-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-error')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                No amounts to Withdraw
            </div>
        </div>
     );
}

export function ComingSoonNetworkNotification() {
    return ( 
        <div className="notification-warning">
            <div className="notification-head">
                <div className="warning-notification-logo"></div>
                <div className="notification-heading">Network Warning</div>
                <button className="error-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-warning')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Support for Mainnets is coming soon
            </div>
        </div>
     );
}

export function InvalidDataNotification() {
    return ( 
        <div className="notification-error">
            <div className="notification-head">
                <div className="error-notification-logo"></div>
                <div className="notification-heading">Invalid Inputs</div>
                <button className="error-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-error')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Please enter valid data in the input fields
            </div>
        </div>
     );
}

export function ShortMsgNotification() {
    return ( 
        <div className="notification-casual">
            <div className="notification-head">
                <div className="casual-notification-logo"></div>
                <div className="notification-heading">Message Short</div>
                <button className="success-notification-cross" onClick={() => {
                    document.getElementsByClassName('notification-casual')[0].style.display = "none";
                  }
                  }>&times;</button>
            </div>
            <div className="notification-desc">
                Please write message containing at least ten characters
            </div>
        </div>
     );
}