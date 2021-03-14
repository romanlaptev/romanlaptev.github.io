<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:template match="/">
<html>
<title> my bookmarks </title>
<head></head>
<body>

<h1> my bookmarks   </h1>

<table border="1" width="85%" cellpadding="10" cellspacing="10">
<xsl:apply-templates/> 
</table>

</body>
</html>
</xsl:template>


<xsl:template match="section">
    <tr>
	<td valign="top">№<xsl:number/>.<xsl:value-of select="@title"/></td>
	<td>
		<xsl:apply-templates select="li/a"/>
		<xsl:apply-templates select="p"/>
		<xsl:apply-templates select="h3"/>
	</td>
    </tr>
</xsl:template>

<xsl:template match="li/a">
    <li><a href="{@href}"><xsl:value-of select="."/></a></li>
</xsl:template>

<xsl:template match="p">
    <pre><xsl:value-of select="."/></pre>
</xsl:template>


</xsl:stylesheet>
