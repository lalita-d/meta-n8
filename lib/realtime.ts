"use client"

// Simplified realtime service for preview (no external dependencies)
class RealtimeService {
  private listeners: Map<string, Function[]> = new Map()

  connect(userId: string) {
    console.log(`Preview mode: Connected user ${userId}`)
  }

  disconnect() {
    console.log("Preview mode: Disconnected")
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)?.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event: string, data: any) {
    console.log(`Preview mode: Emitting ${event}`, data)
  }
}

export const realtimeService = new RealtimeService()
