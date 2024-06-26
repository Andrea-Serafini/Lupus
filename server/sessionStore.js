/* abstract */ class SessionStore {
    findSession(id) { }
    saveSession(id, session) { }
    findAllSessions() { }
    deleteSession(id) { }
}

class InMemorySessionStore extends SessionStore {
    constructor() {
        super();
        this.sessions = new Map();
    }

    findSession(id) {
        return this.sessions.get(id);
    }

    saveSession(id, session) {
        this.sessions.set(id, session);
    }

    deleteSession(id) {
        this.sessions.delete(id);
    }

    findAllSessions() {
        return [...this.sessions.values()];
    }
}

module.exports = {
    InMemorySessionStore
};

/**
 * sessionStore format:
 * [[key,value]]
 * 
 * [ [ sessionID, { connected, username }], ]
 * 
 */