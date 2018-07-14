import time
import random

from flask import Flask, jsonify, render_template
from threading import Thread, Lock, Event

app = Flask(__name__, static_folder='../client', template_folder='../client')
locker = Lock()
should_stop = Event()

devices = [{
    "timestamp": 13887000,
    "latitude": 40.36014911643671,
    "longitude": -111.89167499542236,
    "estimatedRemainingTime": 1704.3
}, {
    "timestamp": 13888000,
    "latitude": 40.3637788315356,
    "longitude": -111.89176082611084,
    "estimatedRemainingTime": 1703.1
}, {
    "timestamp": 13889000,
    "latitude": 40.363811530783344,
    "longitude": -111.88652515411377,
    "estimatedRemainingTime": 1702.2
}, {
    "timestamp": 13890000,
    "latitude": 40.36054152749099,
    "longitude": -111.886568069458,
    "estimatedRemainingTime": 1701.5
}]


def update_location():
    while not should_stop.is_set():
        with locker:
            for device in devices:
                position = random.choice(['latitude', 'longitude'])
                device[position] += random.random() / 100

        time.sleep(1)


@app.route("/api")
def devices_list():
    with locker:
        return jsonify(devices)


@app.route('/')
def root():
    return render_template('index.html')


if __name__ == "__main__":
    updater = Thread(target=update_location)
    updater.start()

    app.run(debug=True, port=8001)
    should_stop.set()
    updater.join()

