unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ExtCtrls, StdCtrls;

type
  TForm1 = class(TForm)
    Button1: TButton;
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
var
  n1: real;
  x,y: real;
  a1,a2: real;
  x0,y0: integer;
  xx,yy: integer;
  r1,r2,r3,r4: integer;
begin

  Form1.Caption:='Ёпициклоида';

  x0:= Form1.ClientWidth div 2;
  y0:= Form1.ClientHeight div 2;

  // оси

  Canvas.MoveTo(x0,y0);
  Canvas.LineTo(x0+150,y0);
  Canvas.LineTo(x0-150,y0);
  Canvas.MoveTo(x0,y0);
  Canvas.LineTo(x0,y0+100);
  Canvas.LineTo(x0,y0-100);

  x:=0;
  y:=0;

  r1:=60;
  r2:=50;

  while n1 < 36 do
     begin
       x:=(r1+r2) * cos(n1) - r2 * cos(((r1*r2)/r2)*n1);
       y:=(r1+r2) * sin(n1) - r2 * sin(((r1*r2)/r2)*n1);
       xx:=x0+Round(x);
       yy:=y0-Round(y);
       Canvas.Pixels[xx,yy]:=clRed;
       n1:=n1+0.0001;
     end;

end;

end.
